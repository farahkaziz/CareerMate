-- =========================================
-- CareerMate minimal database schema
-- =========================================

-- User-selected ESCO skills only.
-- External ESCO metadata remains outside PostgreSQL.
CREATE TABLE IF NOT EXISTS user_skills (
    user_id          INTEGER NOT NULL,
    esco_skill_uri   TEXT NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, esco_skill_uri)
);

CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills (user_id);
