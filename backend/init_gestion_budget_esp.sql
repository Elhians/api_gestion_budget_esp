DROP DATABASE IF EXISTS gestion_budget_esp;
-- Création de la base de données
CREATE DATABASE gestion_budget_esp;
GRANT ALL PRIVILEGES ON gestion_budget_esp.* TO 'niass'@'localhost';
USE gestion_budget_esp;

-- =============================================
--  Table: departement
--  Doit être créée en premier car 'utilisateurs' y fait référence.
-- =============================================
CREATE TABLE departement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL UNIQUE
);
-- =============================================
--  Table: utilisateur
--  Stocke tous les utilisateurs et leur rôle.
--  Le rôle est géré par une colonne ENUM basée sur EnumRole.
-- =============================================
CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL, -- Doit stocker un mot de passe haché
    role ENUM('DIRECTEUR', 'CHEF_DEPARTEMENT', 'ENSEIGNANT', 'AGENT') NOT NULL,
    -- Date de création et de modification pour le suivi
    -- Ces champs sont automatiquement gérés par la base de données
    -- date_creation est initialisé à l'heure actuelle lors de l'insertion
    -- date_modification est mis à jour à chaque modification de l'enregistrement
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reset_token VARCHAR(255) NULL, -- Pour la réinitialisation du mot de passe
    reset_token_expiration DATETIME NULL, -- Pour la réinitialisation du mot de passe
    -- Relation 'appartenir a' (un utilisateur peut appartenir à un département)
    id_departement_appartenance INT NULL,
    
    -- Relation 'diriger' (un utilisateur peut diriger un département)
    id_departement_direction INT NULL UNIQUE, -- UNIQUE pour garantir qu'un chef ne dirige qu'un seul département

    FOREIGN KEY (id_departement_appartenance) REFERENCES departement(id) ON DELETE SET NULL,
    FOREIGN KEY (id_departement_direction) REFERENCES departement(id) ON DELETE SET NULL
);

-- =============================================
--  Table: besoin
--  Contient toutes les demandes soumises par les utilisateurs.
-- =============================================
CREATE TABLE besoin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    categorie VARCHAR(255),
    cout DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    statut ENUM('VALIDE', 'EN_ATTENTE', 'REJETTE') NOT NULL DEFAULT 'EN_ATTENTE',
    date_soumission DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Le lien vers l'utilisateur qui a "exprimé" le besoin
    id_auteur INT NOT NULL,
    FOREIGN KEY (id_auteur) REFERENCES utilisateur(id) ON DELETE CASCADE
);

-- =============================================
--  Table: validation (Implémentation de la Classe d'Association)
--  Lie un 'Utilisateur' et un 'Besoin' et contient les détails de la validation.
-- =============================================
CREATE TABLE validation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Clés étrangères formant l'association
    id_besoin INT NOT NULL,
    id_validateur INT NOT NULL,
    
    -- Attributs de la classe d'association
    source ENUM('DIRECTEUR', 'CHEF_DEPARTEMENT', 'ENSEIGNANT', 'AGENT') NOT NULL,
    statut ENUM('VALIDE', 'EN_ATTENTE', 'REJETTE') NOT NULL,
    commentaire TEXT,
    date_validation DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Définition des clés étrangères
    FOREIGN KEY (id_besoin) REFERENCES besoin(id) ON DELETE CASCADE,
    FOREIGN KEY (id_validateur) REFERENCES utilisateur(id) ON DELETE CASCADE,
    
    -- Contrainte pour s'assurer qu'un utilisateur ne valide un besoin qu'une seule fois
    UNIQUE (id_besoin, id_validateur)
);

INSERT INTO utilisateur ( prenom,  nom, email,  motDePasse, role,statut,  dateDeCreation, dateDeModification, createdAt, updatedAt ) VALUES ('Admin', 'System','admin@esp.sn','$2b$10$pc/05Bzs8tqCLOpya5fz8uIaNC7zlJTbhEPT97CAStibMG0/4YMrG', 'ADMIN', 'active', NOW(), NOW(), NOW(), NOW() );


INSERT INTO revenu (id, description, categorie, montant, idDepartement) VALUES
(1, 'Formation continue "Cybersécurité"', '70 - Ventes', 15000000, 1),
(2, 'Vente d\'expertise (Audit SI)', '70 - Ventes', 5000000, 1),
(3, 'Prestation laboratoire BTP', '70 - Ventes', 25000000, 2),
(4, 'Droits d\'inscription', '75 - Autres produits opérationnels', 120000000, 3);


INSERT INTO activity_log (
  dateHeure,
  action,
  details,
  adresseIp,
  idUtilisateur,
  createdAt,
  updatedAt
) VALUES
(
  '2025-01-10 09:15:23',
  'Connexion',
  'Connexion réussie',
  '192.168.1.1',
  1,
  NOW(),
  NOW()
),
(
  '2025-01-10 09:30:45',
  'Soumission besoin',
  'Achat PC portables - 3.500.000 FCFA',
  '192.168.1.25',
  1,
  NOW(),
  NOW()
),
(
  '2025-01-10 10:15:12',
  'Soumission besoin',
  'Licences logicielles - 1.200.000 FCFA',
  '192.168.1.30',
  1,
  NOW(),
  NOW()
),
(
  '2025-01-10 11:05:33',
  'Modification utilisateur',
  'Mise à jour statut M. Sarr',
  '192.168.1.1',
  1,
  NOW(),
  NOW()
);



INSERT INTO settings (
  anneeBudgetaire,
  dateLimiteSoumission,
  notificationsActivees,
  devise,
  createdAt,
  updatedAt
) VALUES (
  '2025',
  '2025-03-15',
  1,
  'FCFA',
  NOW(),
  NOW()
);
