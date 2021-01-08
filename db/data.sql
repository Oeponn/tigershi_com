PRAGMA foreign_keys = ON;

INSERT INTO users(username, password, role)
VALUES('admin', 'sha512$86a234b43509406e956b6343b2b278cc$2907fdec7cb0f2fb29aeb2bb5144cc1ed8f51df77012406a90c470905e6c85b75d742ff99db6d28fbddc7c85e721f0171e4808de5c293a0baf82ce0d104aaeaf', 'admin');

INSERT INTO search_terms(term, site)
VALUES ('serial experiments lain', 'mercari');

INSERT INTO search_terms(term, site)
VALUES('シリアルエクスペリメンツレイン', 'all');
