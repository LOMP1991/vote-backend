-- Tabla de usuarios (estudiantes y admin)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de elecciones
CREATE TABLE IF NOT EXISTS elections (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de candidatos
CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    election_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (election_id) REFERENCES elections(id)
);

-- Tabla de votos (anónimos)
CREATE TABLE IF NOT EXISTS votes (
    id TEXT PRIMARY KEY,
    election_id TEXT NOT NULL,
    candidate_id TEXT NOT NULL,
    voter_id TEXT NOT NULL, -- se utiliza para impedir doble voto
    hashed_voter_id TEXT NOT NULL, -- evita guardar la identidad real
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (election_id) REFERENCES elections(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);

-- Índice para evitar doble voto por elección
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_vote 
ON votes (election_id, voter_id);
