# Platform Yetenekleri ve Gerçek Durum

[English version](./PLATFORM-CAPABILITIES.en.md)

Bu belge yalnız mevcut repository içeriğini ve doğrulanmış davranışı anlatır. Bir servisin Compose dosyasında bulunması, her production ortamında yapılandırıldığı veya canlı smoke testinin geçtiği anlamına gelmez.

## Durum Sözlüğü

| Durum | Kesin anlamı |
|---|---|
| **Dahil - varsayılan** | Temel `docker-compose.yml` içinde bulunur ve gerekli env sağlandığında temel stack ile başlar. |
| **Dahil - opsiyonel** | Repository içinde overlay/script vardır; ayrıca etkinleştirilmesi ve test edilmesi gerekir. |
| **Harici yapılandırma gerekli** | Kod/servis desteği vardır fakat SMTP, SMS, OAuth, S3 veya DNS gibi harici sağlayıcı gerekir. |
| **Sunulmuyor** | Bu self-host dağıtımının parçası değildir; çoğunlukla Supabase Cloud kontrol düzlemi özelliğidir. |
| **Planlanıyor** | Onaylanmış Issue/roadmap bağlantısı bulunmalıdır. Bağlantı yoksa bu durum kullanılmaz. |
| **Doğrulanmadı** | Dosya veya ayar mevcut olabilir ancak güncel temiz kurulum/runtime kanıtı yoktur. |

## Temel Stack

Topluluk operasyon `management-api` servisi temel Compose icinde bulunur. Ic
agda salt okunur servis sagligi ve sanitize backup/migration durumunu sunar.
Supabase Platform Management API degildir ve Studio kartlari henuz bu servise
bagli degildir. Ayrintilar: [MANAGEMENT-API.md](./MANAGEMENT-API.md).

| Yetenek | Durum | Kanıt ve sınır |
|---|---|---|
| PostgreSQL | Dahil - varsayılan | `docker-compose.yml` içindeki `db` servisi. Backup, bakım ve HA kullanıcı sorumluluğudur. |
| Studio | Dahil - varsayılan | `studio` servisi. Cloud organizasyon/proje kontrol düzlemi değildir. |
| Auth | Dahil - varsayılan | `auth` servisi. Email/şifre kullanılabilir; SMTP, SMS ve OAuth ayrıca yapılandırılır. |
| REST API | Dahil - varsayılan | PostgREST `rest` servisi. Erişim güvenliği RLS ve yetkilere bağlıdır. |
| GraphQL | Dahil - varsayılan | PostgreSQL `pg_graphql` extension ve API yapılandırmasına bağlıdır. Her şemada otomatik yetki vermez. |
| Realtime | Dahil - varsayılan | `realtime` servisi ve gerekli database publication/izinleri gerekir. |
| Storage | Dahil - varsayılan | `storage` ve `imgproxy` servisleri. Varsayılan backend yerel persistent dizindir. |
| Edge Functions | Dahil - varsayılan | `functions` servisi örnek function dizinini çalıştırır. Cloud global dağıtım sağlamaz. |
| postgres-meta | Dahil - varsayılan | Studio'nun database metadata işlemleri için `meta` servisi. |
| Supavisor | Dahil - varsayılan | Connection pooler servisi. Host portları firewall/bind kurallarıyla korunmalıdır. |
| Kong API Gateway | Dahil - varsayılan | Public uygulama trafiğinin ana girişidir. Doğrudan yayınlanan host portları ayrıca sınırlandırılır. |

Temel Compose ve shell kontrolleri GitHub Actions içinde çalışır. Bu doğrulama containerların production verisiyle canlı smoke test edildiği anlamına gelmez.

Public domain `503 Service Unavailable` donduruyorsa ilgili deployment
dogrulanmis sayilmaz. Bu durumda once Coolify/Kong backend route, service
health, internal port `8000` ve Compose reload durumu kontrol edilir; yazmali
Auth/Storage/Realtime smoke testlerine gecilmez.

## Opsiyonel Bileşenler

| Yetenek | Durum | Etkinleştirme ve kanıt |
|---|---|---|
| Logflare/Vector Analytics | Dahil - opsiyonel | `docker-compose.logs.yml`; ek RAM/CPU ve ayrıca runtime doğrulaması gerekir. |
| S3 uyumlu Storage | Dahil - opsiyonel | `docker-compose.s3.yml` ve test dosyaları; sağlayıcı credential ve bucket gerekir. |
| RustFS | Dahil - opsiyonel | `docker-compose.rustfs.yml`; temel stackin otomatik parçası değildir. |
| Caddy/Nginx HTTPS proxy | Dahil - opsiyonel | İlgili Compose overlay ve proxy config dosyaları bulunur. DNS/TLS ayrıca hazırlanır. |
| Envoy gateway | Dahil - opsiyonel | `docker-compose.envoy.yml`; varsayılan Kong yolunun otomatik yerine geçmez. |
| PostgreSQL 17 yükseltme araçları | Dahil - opsiyonel | `docker-compose.pg17.yml` ve upgrade scripti. Backup/restore testi olmadan uygulanmaz. |
| Harici SMTP | Harici yapılandırma gerekli | Auth email gönderimi için gerçek SMTP bilgileri gerekir. Örnek Mailpit production servisi değildir. |
| OAuth sağlayıcıları | Harici yapılandırma gerekli | Sağlayıcı uygulaması, callback URL ve secret gerekir. Studio ekranının görünmesi yeterli kanıt değildir. |
| SMS/telefon Auth | Harici yapılandırma gerekli | Desteklenen SMS sağlayıcısı ve credential gerekir. |

Opsiyonel bir dosyanın repository içinde bulunması, bütün kombinasyonların aynı anda desteklendiği anlamına gelmez. Her kombinasyon ayrı Compose config ve smoke testi gerektirir.

## Supabase Cloud ile Farklar

Asagidaki Supabase Platform Management API siniri degismemistir. Repository'deki
topluluk operasyon API'si Cloud organization/proje kontrol duzleminin esdegeri
degildir.

| Cloud yeteneği | Self-host durumu |
|---|---|
| Tek panelden organization ve yeni proje oluşturma | Sunulmuyor; bir stack bir izole projedir. |
| Managed backup ve Point-in-Time Recovery | Sunulmuyor; backup/restore operasyonu kullanıcıya aittir. |
| Managed High Availability ve otomatik ölçekleme | Sunulmuyor. |
| Supabase Platform Management API | Sunulmuyor. |
| Branching/preview database kontrol düzlemi | Sunulmuyor. |
| Global multi-region Edge Functions | Sunulmuyor; yalnız deploy edilen altyapıda çalışır. |
| Cloud'a özel ETL, gelişmiş analytics ve entegrasyonlar | Temel self-host stackte sunulmuyor veya açık kaynak karşılığı ayrıca kurulmalıdır. |

Bu özellikler “yakında gelecek” olarak kabul edilmez. Yalnız onaylanmış ve bağlantılı bir Issue/roadmap varsa **Planlanıyor** olarak eklenebilir.

## Extension, Integration ve Client Ayrımı

1. **PostgreSQL extension:** Image içinde mevcutsa SQL veya Studio üzerinden etkinleştirilebilir. Image içinde olmayan extension için özel image ve migration testi gerekir.
2. **Studio integration:** Ekranda görünmesi self-host desteğini garanti etmez. Cloud API bağımlılığı ve lisans ayrıca kontrol edilir.
3. **Client library:** `supabase-js` ve diğer istemciler self-host URL/anahtarlarıyla çalışabilir; server tarafındaki özelliğin yapılandırılmış olması gerekir.

## Çoklu Proje Modeli

Bu dağıtım Cloud benzeri çoklu proje kontrol düzlemi hedeflemez. Her bağımsız proje için ayrı stack, domain, database/Storage volume, secret seti, backup planı ve kaynak limiti kullanılır.

## Bir Yetenek Ne Zaman “Doğrulandı” Sayılır?

Bir capability ancak aşağıdaki kanıtlar raporlandığında runtime doğrulanmış sayılır:

1. Kullanılan repository commit SHA ve Compose/overlay listesi
2. `docker compose config` sonucu
3. Container health ve sabit restart sayıları
4. İlgili endpoint için read-only smoke testi
5. Persistent veri kullanılan özelliklerde veri görünürlüğü
6. Rollback yolu

Bu kanıtlar yoksa belge yalnız **dahil**, **opsiyonel** veya **doğrulanmadı** diyebilir; production garantisi veremez.

## Doğrulanmış Topluluk Studio Ekleri

| Yetenek | Doğrulanmış sınır |
|---|---|
| Operations kartları | İç Management API üzerinden salt okunur servis sağlığı ve deploy commit'i. |
| Usage kartları | Self-host Logflare ham tablolarından son 24 saat toplamı. |
| Observability Lite | Yalnız Query Performance; Cloud control-plane raporları kapalı kalır. |
| Dashboard Preferences | Tarayıcıya yerel tercihler; Platform API veya billing bağımlılığı yoktur. |
| Function Secrets | Redacted CRUD, kalıcı named volume ve Edge Runtime hot reload. |

Backup ve migration kartları yalnız operatörün yayınladığı durum kanıtını
gösterir. Panel henüz backup oluşturmaz, restore çalıştırmaz veya migration
uygulamaz.

Belge güncelleme kuralları: [DOCUMENTATION-MAINTENANCE.md](./DOCUMENTATION-MAINTENANCE.md).

## Plan, Private Validation ve Public Release Ayrimi

Platform yetenegi tablosuna yeni bir madde eklenirken durum mutlaka acik
yazilir:

- **Plan:** henuz uygulanmamis hedef.
- **Private validation:** kendi test/deployment ortamimizda denenmis, ancak
  public community icin sanitize edilmemis is.
- **Public release:** bu repoda merge edilmis, CI/link/secret kontrolleri
  gecmis ve changelog'a baglanmis is.
- **Upstream candidate:** Supabase veya bilesen upstream reposuna aday genel
  degisiklik.

Bu ayrim, forum duyurularinda ve AI handoff notlarinda da korunur. Ayrintili
kural: [COMMUNITY-PUBLICATION-FLOW.md](./COMMUNITY-PUBLICATION-FLOW.md).
