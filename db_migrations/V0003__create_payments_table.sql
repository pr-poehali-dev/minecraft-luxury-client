CREATE TABLE IF NOT EXISTS t_p80966808_minecraft_luxury_cli.payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p80966808_minecraft_luxury_cli.users(id),
    plan_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_id VARCHAR(255) UNIQUE,
    payment_url TEXT,
    qr_code_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);