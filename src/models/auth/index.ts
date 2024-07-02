import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().min(1, { message: 'You must provide a username' }),
  password: z.string().min(1, { message: 'You must provide a password' }),
});

export const claimsSchema = z.object({
  cd_identityUsuario: z.string(),
  nb_nombreUsuario: z.string(),
  Idioma: z.string(),
  cd_identityPaisUsuario: z.string(),
  nb_paisUsuario: z.string(),
  tx_acronimoPais: z.string(),
  cd_identitySucursalUsuario: z.string(),
  nb_sucursalUsuario_sucursal: z.string(),
  CulturaUsuario: z.string(),
  ZonaHorarioaUsuario: z.string(),
  st_estatus: z.string(),
  url_soporte: z.string(),
  cliente: z.string(),
  exp: z.number(),
  iss: z.string(),
  aud: z.string(),
});

export type Claims = z.infer<typeof claimsSchema>;

export type User = {
  username: string;
  active: boolean;
  claims: Claims;
};
