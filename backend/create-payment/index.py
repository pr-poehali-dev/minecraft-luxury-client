import json
import os
import uuid
import requests
import base64
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Создание платежа через ЮKassa с поддержкой СБП и карт
    Args: event - dict с httpMethod, body (userId, planName, amount, paymentMethod)
          context - объект с request_id
    Returns: HTTP response с payment_id, payment_url, qr_code_url или redirect_url
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    user_id = body_data.get('userId')
    plan_name = body_data.get('planName')
    amount = body_data.get('amount')
    payment_method = body_data.get('paymentMethod', 'sbp')
    
    if not all([user_id, plan_name, amount]):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Missing required fields'})
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
    
    idempotence_key = str(uuid.uuid4())
    
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = auth_string.encode('ascii')
    auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
    
    if payment_method == 'card':
        yookassa_payload = {
            "amount": {
                "value": f"{amount:.2f}",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "https://your-domain.com/payment-success"
            },
            "capture": True,
            "description": f"Оплата тарифа {plan_name}",
            "metadata": {
                "user_id": str(user_id),
                "plan_name": plan_name
            }
        }
    else:
        yookassa_payload = {
            "amount": {
                "value": f"{amount:.2f}",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "qr"
            },
            "capture": True,
            "description": f"Оплата тарифа {plan_name}",
            "metadata": {
                "user_id": str(user_id),
                "plan_name": plan_name
            }
        }
    
    headers = {
        'Authorization': f'Basic {auth_b64}',
        'Idempotence-Key': idempotence_key,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        'https://api.yookassa.ru/v3/payments',
        json=yookassa_payload,
        headers=headers
    )
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Payment creation failed', 'details': response.text})
        }
    
    payment_data = response.json()
    payment_id = payment_data.get('id')
    payment_url = payment_data.get('confirmation', {}).get('confirmation_url')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO t_p80966808_minecraft_luxury_cli.payments (user_id, plan_name, amount, payment_id, payment_url, qr_code_url, status) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (user_id, plan_name, amount, payment_id, payment_url, payment_url, 'pending')
    )
    
    conn.commit()
    cur.close()
    conn.close()
    
    if payment_method == 'card':
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'payment_id': payment_id,
                'redirect_url': payment_url
            })
        }
    else:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'payment_id': payment_id,
                'payment_url': payment_url,
                'qr_code_url': payment_url
            })
        }