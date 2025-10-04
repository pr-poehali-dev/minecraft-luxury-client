import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create purchase order endpoint
    Args: event - dict with httpMethod, body
          context - object with request_id
    Returns: HTTP response dict with purchase data or error
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    user_id = body_data.get('userId')
    plan_name = body_data.get('planName', '').strip()
    price = body_data.get('price')
    payment_method = body_data.get('paymentMethod', 'card')
    
    if not user_id or not plan_name or not price:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'User ID, plan name and price are required'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute("SELECT id FROM users WHERE id = " + str(int(user_id)))
    user = cursor.fetchone()
    
    if not user:
        cursor.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'User not found'})
        }
    
    cursor.execute(
        "INSERT INTO purchases (user_id, plan_name, price, payment_method, status) VALUES (" +
        str(int(user_id)) + ", '" + 
        plan_name.replace("'", "''") + "', " +
        str(float(price)) + ", '" +
        payment_method.replace("'", "''") + "', 'completed') " +
        "RETURNING id, plan_name, price, status, created_at"
    )
    purchase = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'purchase': {
                'id': purchase['id'],
                'planName': purchase['plan_name'],
                'price': float(purchase['price']),
                'status': purchase['status'],
                'createdAt': purchase['created_at'].isoformat() if purchase['created_at'] else None
            }
        })
    }
