import { AppDataSource } from '../database/data-source';
import { User } from 'src/features/users/entities/user.entity';
import { Role } from 'src/features/roles/entities/role.entity';
import { ModuleEntity } from '../modules/entities/module.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Base de datos conectada');

    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);
    const moduleRepo = AppDataSource.getRepository(ModuleEntity);

    // 1. Crear módulos si no existen
    const moduleNames = ['users', 'vehiculos', 'fichas'];
    const modules: ModuleEntity[] = [];

    for (const name of moduleNames) {
      let module = await moduleRepo.findOne({ where: { name } });
      if (!module) {
        module = moduleRepo.create({
          name,
          description: `Módulo de gestión de ${name}`,
        });
        await moduleRepo.save(module);
        console.log(`📦 Módulo "${name}" creado`);
      }
      modules.push(module);
    }

    // 2. Crear rol 'ADMIN' si no existe
    let role = await roleRepo.findOne({ where: { name: 'ADMIN' } });
    if (!role) {
      role = roleRepo.create({
        name: 'ADMIN',
        description: 'Administrador del sistema',
        modules: modules, // Asignamos todos los módulos al admin
      });
      await roleRepo.save(role);
      console.log('🔑 Rol "ADMIN" creado con todos los módulos');
    } else {
      // Si ya existe, actualizamos sus módulos por si faltan
      role.modules = modules;
      await roleRepo.save(role);
      console.log('🔄 Rol "ADMIN" actualizado con nuevos módulos');
    }

    // 3. Crear usuario administrador inicial si no existe
    const email = 'admin@sena.edu.co';
    let user = await userRepo.findOne({ where: { email } });
    if (!user) {
      const hashedPassword = await bcrypt.hash('admin123456', 10);
      user = userRepo.create({
        name: 'Admin',
        lastName: 'Sena',
        docType: 'CC',
        docNumber: '12345678',
        email: email,
        telephone: '3001234567',
        FamTelephone: '3010000000',
        state: 'activo',
        password: hashedPassword,
        isActive: true,
        roles: [role],
      });
      await userRepo.save(user);
      console.log(`👤 Usuario "${email}" creado con éxito (Password: admin123456)`);
    } else {
      console.log(`ℹ️ El usuario "${email}" ya existe en la base de datos.`);
    }

    await AppDataSource.destroy();
    console.log('🏁 Proceso de semilla completado con éxito.');
  } catch (err) {
    console.error('❌ Error durante la ejecución del seed:', err);
  }
}

seed();
