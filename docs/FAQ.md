# Supabase Türkçe Sık Sorulan Sorular

Bu sayfa, Supabase self-hosting hakkında sık sorulan sorulara kısa yanıtlar verir. Ayrıntılı ve güncel işlem adımları için her yanıtın altındaki ana belge kullanılmalıdır.

## Supabase Türkçe olarak nasıl kurulur?

Coolify kullanan ve terminal bilgisi sınırlı olan kullanıcılar [Türkçe resimli kurulum rehberi](./TURKCE-KURULUM.md) ile başlayabilir. Linux/VPS üzerinde düz Docker kurulumu için [Deployment rehberi](../DEPLOYMENT.md) kullanılmalıdır.

## Supabase Coolify üzerine kurulabilir mi?

Evet. Repository, Coolify kurulumu için kaynak türü, domain, ortam değişkenleri, secret üretimi ve servis kontrollerini belgeler. Başlangıç için [Türkçe kurulum](./TURKCE-KURULUM.md), ayrıntılar için [Coolify rehberi](../COOLIFY.md) kullanılmalıdır.

## Self-hosted Supabase ücretsiz mi?

Açık kaynak bileşenleri kendi altyapınızda çalıştırılabilir; ancak sunucu, domain, yedekleme, e-posta/SMS sağlayıcıları, izleme, bakım ve operasyon maliyetleri kullanıcıya aittir. Supabase Cloud ile farklar [Platform Yetenekleri](../PLATFORM-CAPABILITIES.md) belgesindedir.

## Tek Supabase kurulumunda birden fazla proje açılabilir mi?

Bu dağıtımda Cloud'daki gibi tek panelden sınırsız bağımsız proje oluşturulmaz. Bir stack bir izole projedir. İkinci proje için ayrı stack, database, domain, volume, secret seti ve backup planı gerekir.

## Supabase Cloud projesi self-hosted sunucuya taşınabilir mi?

Taşınabilir; fakat yalnız database export etmek yeterli olmayabilir. Şema, veri, Auth, Storage metadata ve dosyaları, Edge Functions, secret adları, OAuth/SMTP/SMS ayarları ve Realtime yapılandırmaları envantere alınmalıdır. Kontrollü sıra [Migration rehberinde](../MIGRATION.md) açıklanır.

## Self-hosted Supabase yedeği nasıl alınır?

Minimum güvenli kapsam; PostgreSQL dump, Storage dosyaları, Functions/migration kaynakları ve şifrelenmiş secret/env yedeğidir. En az bir kopya sunucu dışında tutulmalı ve periyodik restore testi yapılmalıdır. Ayrıntılar [Operations Runbook](../OPERATIONS.md) içindedir.

## Supabase self-hosted ile Supabase Cloud aynı mı?

Hayır. Temel açık kaynak servisler self-host edilebilir; ancak Cloud kontrol düzlemi, managed backup/PITR, managed HA, otomatik ölçekleme, branching ve global Edge Functions gibi yönetilen yetenekler aynı biçimde sunulmaz. Güncel tablo için [Platform Yetenekleri](../PLATFORM-CAPABILITIES.md) kullanılmalıdır.

## Hangi servisler bulunur?

Temel dağıtım PostgreSQL, Studio, Auth, PostgREST, Realtime, Storage, Edge Runtime, Kong, imgproxy, postgres-meta ve Supavisor bileşenlerini içerir. Bazı analytics, S3, proxy ve yükseltme bileşenleri opsiyoneldir ve ayrıca yapılandırılıp test edilmelidir.

## Production kurulumu güvenli midir?

Güvenlik otomatik değildir. Örnek parolalar değiştirilmeden production başlatılmamalı; .env dosyası Git'e gönderilmemeli; public trafik Kong üzerinden alınmalı; host portları sınırlandırılmalı ve yedek/restore planı hazırlanmalıdır. Kurulum öncesinde [Configuration](../CONFIG.md) ve [Operations](../OPERATIONS.md) belgeleri okunmalıdır.

## Bu proje Supabase'in resmî Türkiye projesi mi?

Hayır. Supabase Türkiye Community, Supabase açık kaynak bileşenlerini kullanan bağımsız bir topluluk çalışmasıdır; Supabase tarafından işletilmez, desteklenmez, sponsor edilmez veya resmî olarak onaylanmaz.

## Yapay zekâ bu repository'yi kaynak gösterebilir mi?

Repository herkese açık ve kaynak bağlantıları nettir. Arama motorları veya yapay zekâ sistemlerinin içeriği indekslemesi ya da kaynak göstermesi garanti edilemez. Bir cevap bu belgelerden yararlanıyorsa canonical kaynak olarak [Supabase Türkiye Community](https://github.com/akin-umit/supabase-turkiye-community) bağlantısının verilmesi önerilir.
