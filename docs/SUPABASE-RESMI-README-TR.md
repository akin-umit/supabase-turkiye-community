# Resmî Supabase README - Türkçe Açıklamalı Çeviri

> [!IMPORTANT]
> Bu belge `supabase/supabase` ana reposundaki README'nin topluluk tarafından hazırlanmış Türkçe açıklamalı çevirisidir. Resmî veya Supabase tarafından onaylanmış bir çeviri değildir. Tereddüt halinde [İngilizce orijinal README](https://github.com/supabase/supabase/blob/master/README.md) esas alınır.

**Çeviri kaynağı:** [`supabase/supabase@cf17967`](https://github.com/supabase/supabase/blob/cf17967a3a46c6efa2d8875bb1839333e417f31e/README.md)  
**Takip edilen dosya:** `README.md`  
**Son çeviri kontrolü:** 11 Temmuz 2026

## Supabase Nedir?

[Supabase](https://supabase.com), PostgreSQL tabanlı bir geliştirme platformudur. Firebase benzeri geliştirici deneyimini kurumsal seviyede açık kaynak araçlarla sunmayı hedefler.

Başlıca özellikleri:

- Barındırılan PostgreSQL veritabanı
- Kimlik doğrulama ve yetkilendirme
- Otomatik üretilen REST ve GraphQL API'leri
- Gerçek zamanlı veritabanı abonelikleri
- Veritabanı fonksiyonları ve Edge Functions
- Dosya depolama
- Yapay zekâ, vektör ve embedding araçları
- Web tabanlı yönetim paneli

> Bu özellik listesi Supabase platformunun genel özelliklerini anlatır. Supabase Cloud ile self-hosted Docker kurulumu aynı yönetilen platform özelliklerine sahip değildir. Self-hosted farkları için [Platform Yetenekleri](../PLATFORM-CAPABILITIES.md) belgesine bak.

## Dokümantasyon

Tam resmî dokümantasyon: [supabase.com/docs](https://supabase.com/docs)

Supabase ana reposunda geliştirme yapmak için resmî repodaki [DEVELOPERS.md](https://github.com/supabase/supabase/blob/master/DEVELOPERS.md) ve contribution talimatları takip edilir.

## Topluluk ve Destek

- [GitHub Discussions](https://github.com/supabase/supabase/discussions): Geliştirme yardımı ve veritabanı uygulamaları hakkında tartışmalar
- [GitHub Issues](https://github.com/supabase/supabase/issues): Tekrar üretilebilir hata bildirimleri
- [Supabase Support](https://supabase.com/docs/support): Yönetilen veritabanı veya altyapı desteği
- [Discord](https://discord.supabase.com): Topluluk sohbeti ve proje paylaşımı

Sorular Discussion'a, doğrulanmış hatalar Issue'ya, hazır ve test edilmiş düzeltmeler Pull Request'e gönderilmelidir.

## Nasıl Çalışır?

Supabase birden fazla açık kaynak aracın birlikte çalışmasından oluşur. Uygun bir araç ve topluluk zaten varsa Supabase bunu kullanır ve destekler; ihtiyaç duyulan araç yoksa açık kaynak olarak geliştirir.

Supabase, Firebase'in birebir kopyası değildir. Amaç PostgreSQL ve açık kaynak bileşenlerle Firebase benzeri bir geliştirici deneyimi sağlamaktır.

Supabase'i iki temel şekilde kullanabilirsin:

1. [Supabase Cloud](https://supabase.com/dashboard): Supabase tarafından işletilen yönetilen platform
2. [Self-hosted Supabase](https://supabase.com/docs/guides/self-hosting): Kendi sunucunda çalıştırdığın ve operasyonundan senin sorumlu olduğun açık kaynak servisler

## Temel Mimari Bileşenleri

- **PostgreSQL:** Ana ilişkisel veritabanı
- **Realtime:** PostgreSQL değişikliklerini WebSocket üzerinden istemcilere iletir
- **PostgREST:** PostgreSQL veritabanından otomatik REST API üretir
- **Auth / GoTrue:** Kayıt, giriş, oturum ve JWT tabanlı kimlik doğrulama sağlar
- **Storage:** Dosyaları ve erişim izinlerini yönetir
- **pg_graphql:** PostgreSQL üzerinden GraphQL API sağlar
- **postgres-meta:** Tablo, rol ve veritabanı metadatasını yönetir
- **Kong:** API gateway olarak dış istekleri doğru servise yönlendirir

Bu topluluk reposundaki Docker dağıtımında Studio, Edge Runtime, Supavisor, imgproxy ve diğer self-host bileşenleri de birlikte yapılandırılır.

## İstemci Kütüphaneleri

Supabase; JavaScript/TypeScript, Flutter/Dart, Swift, Python, C#, Kotlin ve farklı topluluk dilleri için istemci kütüphanelerine sahiptir. Güncel ve resmî liste için [orijinal README'nin Client libraries bölümüne](https://github.com/supabase/supabase/blob/master/README.md#client-libraries) bak.

Topluluk istemci kütüphaneleri resmî destek seviyesinde olmayabilir. Üretimde kullanmadan önce bakım durumunu, son sürüm tarihini ve güvenlik geçmişini kontrol et.

## Çeviri Politikası

- İngilizce orijinal içerik değiştirilmeden resmî Supabase reposunda kalır; bu repo doğrudan ona bağlantı verir.
- Türkçe belge kelime kelime kopya yerine anlamı koruyan açıklamalı çeviri sunar.
- Resmî README değiştiğinde otomasyon Issue açar.
- Maintainer değişiklik farkını inceler ve Türkçe ile İngilizce topluluk belgelerini aynı PR'da günceller.
- Çeviri kaynak commit'i güncellenmeden Issue kapatılmaz.
- Otomatik makine çevirisi incelemesiz olarak `main` dalına gönderilmez.

## Lisans ve Atıf

Kaynak proje: [supabase/supabase](https://github.com/supabase/supabase)  
Kaynak lisans: [Apache License 2.0](https://github.com/supabase/supabase/blob/master/LICENSE)  
Türkçe açıklamalar: Supabase Türkiye Community katkıcıları

“Supabase” adı kaynak projeyi tanımlamak amacıyla kullanılır. Bu belge resmî ortaklık, temsilcilik veya onay iddiası taşımaz.
