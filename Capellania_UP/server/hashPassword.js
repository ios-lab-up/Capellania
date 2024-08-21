const bcrypt = require('bcryptjs');
const pool = require('./config/database');

async function hashPassword() {
  const email = 'capellan@example.com';  // Cambia esto por el email del capellán
  const plainTextPassword = 'securepassword';  // La contraseña en texto plano
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

  try {
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [plainTextPassword, email]
    );
    console.log('Contraseña cifrada y actualizada correctamente para el usuario:', email);
  } catch (error) {
    console.error('Error al actualizar la contraseña cifrada:', error);
  }
}

hashPassword();
