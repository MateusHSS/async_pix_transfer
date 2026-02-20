CREATE TABLE credenciais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL UNIQUE REFERENCES cliente(id) ON DELETE CASCADE,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);