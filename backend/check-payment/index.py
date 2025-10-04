import json
import os
import requests
import base64
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Проверка статуса платежа в ЮKassa и обновление в БД
    Args: event - dict с httpMethod, queryStringParameters (payment_id)
          context - объект с request_id
    Returns: HTTP response со статусом платежа
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {})
    payment_id = params.get('payment_id')
    
    if not payment_id:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Missing payment_id'})
        }
    
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    database_url = os.environ.get('DATABASE_URL')
    
    if not all([shop_id, secret_key, database_url]):
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Payment system not configured'})
        }
    
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = auth_string.encode('ascii')
    auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
    
    headers = {
        'Authorization': f'Basic {auth_b64}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        f'https://api.yookassa.ru/v3/payments/{payment_id}',
        headers=headers
    )
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Failed to check payment status'})
        }
    
    payment_data = response.json()
    status = payment_data.get('status')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if status == 'succeeded':
        cur.execute(
            "UPDATE t_p80966808_minecraft_luxury_cli.payments SET status = %s, paid_at = CURRENT_TIMESTAMP WHERE payment_id = %s",
            ('paid', payment_id)
        )
    elif status == 'canceled':
        cur.execute(
            "UPDATE t_p80966808_minecraft_luxury_cli.payments SET status = %s WHERE payment_id = %s",
            ('canceled', payment_id)
        )
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'payment_id': payment_id,
            'status': status,
            'paid': status == 'succeeded'
        })
    }
