# Izole Backup Restore Tatbikati

[English](./RESTORE-DRILL.en.md)

Restore testi production database veya volume'una baglanmadan gecici bir
PostgreSQL containerinda yapilmalidir.

## Dogrulanmis kurallar

1. Restore oncesi checksumlari dogrula.
2. Backup ile ayni pinned `supabase/postgres` image surumunu kullan.
3. Yalniz `pg_isready` bekleme. Image logunda `PostgreSQL init process complete;
   ready for start up.` satirini bekle.
4. Image'in gercek superuser rolu `supabase_admin` ile restore et.
5. Gecici maintenance database olustur; initialize edilmis hedef `postgres`
   database'i silip `template0` ile temiz olustur.
6. Hedef image'de bulunan rollerin yalniz `CREATE ROLE` satirlarini gecici dump
   akisindan filtrele. Eksik rolleri ve sonraki grant/attribute satirlarini koru.
7. `ON_ERROR_STOP=1` kullan ve restore logunu gizli tut.
8. Kalici schema/table, Auth user ve Storage bucket sayilarini kaynakla salt-okunur
   karsilastir.
9. Storage/Functions/config arsivlerini gecici dizine acip butunlugunu dogrula.
10. Gecici SQL, log, container, dizin ve volume'u sil.

## Sik restore hatalari

- `role already exists`: Supabase image sistem rollerini onceden olusturur.
- `only superusers can modify it`: `postgres` yerine `supabase_admin` gerekir.
- `schema auth already exists`: hedef database image tarafindan initialize
  edilmistir; temiz `template0` database'e restore gerekir.

Production restore'dan once bu tatbikat gecmeden backup "dogrulanmis" sayilmaz.
