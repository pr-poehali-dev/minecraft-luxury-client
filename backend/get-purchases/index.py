import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение истории покупок и платежей пользователя
    Args: event - dict с httpMethod, queryStringParameters (user_id)
          context - объект с request_id
    Returns: HTTP response со списком покупок и платежей
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
    user_id = params.get('user_id')
    
    if not user_id:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Missing user_id'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT 
            id, 
            plan_name, 
            amount, 
            payment_id, 
            status, 
            created_at, 
            paid_at 
        FROM t_p80966808_minecraft_luxury_cli.payments 
        WHERE user_id = %s 
        ORDER BY created_at DESC
    """, (user_id,))
    
    payments = []
    for row in cur.fetchall():
        payments.append({
            'id': row[0],
            'plan_name': row[1],
            'amount': float(row[2]),
            'payment_id': row[3],
            'status': row[4],
            'created_at': row[5].isoformat() if row[5] else None,
            'paid_at': row[6].isoformat() if row[6] else None
        })
    
    cur.execute("""
        SELECT 
            id, 
            plan_name, 
            price, 
            payment_method, 
            created_at 
        FROM t_p80966808_minecraft_luxury_cli.purchases 
        WHERE user_id = %s 
        ORDER BY created_at DESC
    """, (user_id,))
    
    purchases = []
    for row in cur.fetchall():
        purchases.append({
            'id': row[0],
            'plan_name': row[1],
            'price': float(row[2]),
            'payment_method': row[3],
            'created_at': row[4].isoformat() if row[4] else None
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'payments': payments,
            'purchases': purchases,
            'total_count': len(payments) + len(purchases)
        })
    }
