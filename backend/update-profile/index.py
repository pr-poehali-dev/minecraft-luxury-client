import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Update user profile endpoint
    Args: event - dict with httpMethod, body
          context - object with request_id
    Returns: HTTP response dict with updated user data or error
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
    username = body_data.get('username', '').strip()
    email = body_data.get('email', '').strip()
    
    if not user_id or not username or not email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'User ID, username and email are required'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute("SELECT id FROM users WHERE email = '" + email.replace("'", "''") + "' AND id != " + str(int(user_id)))
    existing = cursor.fetchone()
    
    if existing:
        cursor.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Email already used by another user'})
        }
    
    cursor.execute(
        "UPDATE users SET username = '" + username.replace("'", "''") + 
        "', email = '" + email.replace("'", "''") + 
        "' WHERE id = " + str(int(user_id)) + 
        " RETURNING id, username, email"
    )
    user = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    
    if not user:
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'User not found'})
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        })
    }
