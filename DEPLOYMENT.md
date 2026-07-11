# Deployment Guide

The base stack includes an internal read-only operational Management API. Set a
fresh `MANAGEMENT_API_TOKEN` before deployment. Do not publish port `8080`, add
the service to Kong, mount the Docker socket, or pass its bearer token to
browser code. See [MANAGEMENT-API.en.md](./MANAGEMENT-API.en.md).

Bu belge sifir sunucu, yeniden kurulum ve farkli Docker Compose platformlari icin ana kaynaktir.

## Mimari

Tek public giris Kong'dur. Studio ve API servisleri Kong arkasindadir:

- Studio: `/project/default`
- Auth: `/auth/v1`
- REST: `/rest/v1`
- Storage: `/storage/v1`
- Realtime: `/realtime/v1`
- Edge Functions: `/functions/v1`

`db`, `meta`, `supavisor`, `studio`, `auth`, `rest`, `storage`, `realtime` ve `functions` internete dogrudan acilmaz.

## Gereksinimler

- Linux sunucu
- Docker Engine ve Docker Compose v2
- Git
- En az 4 CPU, 8 GB RAM ve hizli SSD; production yukune gore artirilir
- DNS kaydi ve TLS destekli reverse proxy
- Harici, sunucu disi yedek hedefi

## Ortak Sifir Kurulum

```bash
git clone <REPOSITORY_URL> supabase-selfhost
cd supabase-selfhost
cp .env.example .env
sh utils/generate-keys.sh
sh utils/add-new-auth-keys.sh --update-env
```

`.env` icinde en az su alanlar ortama gore ayarlanir:

```env
SUPABASE_PUBLIC_URL=https://supabase.example.com
API_EXTERNAL_URL=https://supabase.example.com/auth/v1
SITE_URL=https://app.example.com
STUDIO_DEFAULT_ORGANIZATION=Example
STUDIO_DEFAULT_PROJECT=Example Self Hosted Supabase
```

Secretlar Git'e eklenmez. Baslatmadan once:

```bash
docker compose --env-file .env config -q
docker compose pull
docker compose up -d
docker compose ps
```

Ilk saglik kontrolu [OPERATIONS.md](./OPERATIONS.md) ile tamamlanir.

## Coolify

Git repository tabanli Docker Compose application olusturulur. Compose yolu `/docker-compose.yml`, base directory `/` ve repository preservation acik olmalidir. Yalniz Kong'a public domain atanir. Ayrintilar [COOLIFY.md](./COOLIFY.md) icindedir.

## Duz Docker / VPS

Kong `8000` portu Caddy, Nginx veya Traefik arkasina verilir. TLS reverse proxy'de sonlandirilir. Postgres ve yonetim servisleri firewall ile public erisime kapali tutulur.

## Diger Platformlar

Portainer, Dokploy, CapRover veya Compose destekleyen baska bir platformda ayni kurallar gecerlidir:

1. Repo tam olarak checkout edilir; `volumes/` dosyalari korunur.
2. Secretlar platform secret store'a girilir.
3. Persistent path'ler host veya kalici volume'a baglanir.
4. Yalniz Kong public route alir.
5. Platformun compose donusumu network aliaslarini ve bind mountlari korumalidir.

Kubernetes icin bu Compose dosyasi otomatik cevrilmez. Ayrica Helm/Kustomize tasarimi, StatefulSet, PVC, secret manager ve backup operatoru gerekir.

## Yeniden Kurulum

Bos kurulumda yukaridaki sifir kurulum uygulanir. Mevcut veriden yeniden kurulumda once yeni stack bos olarak ayaga kaldirilir, sonra [MIGRATION.md](./MIGRATION.md) restore sirasi kullanilir. Eski stack restore ve smoke bitmeden silinmez.
