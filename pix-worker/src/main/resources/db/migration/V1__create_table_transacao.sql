CREATE TABLE transacao (
    id UUID PRIMARY KEY,
    cliente_id VARCHAR(255) NOT NULL,
    valor DECIMAL(19, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_hora TIMESTAMP NOT NULL
);