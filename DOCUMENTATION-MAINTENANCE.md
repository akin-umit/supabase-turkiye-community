# Belge Güncelleme Sözleşmesi / Documentation Maintenance Contract

Kod, Compose, script veya test değişikliği ilgili belgeler güncellenmeden tamamlanmış sayılmaz. Bu kural insan, AI destekli ve tam AI-agent katkıları için aynıdır.

## Tek Kaynak Kuralı

- Belgeler yalnız mevcut davranışı, kanıtlanmış sonucu veya açıkça etiketlenmiş planı anlatır.
- “Dosyada mevcut”, “CI geçti” ve “production smoke geçti” ayrı kanıt seviyeleridir.
- Olmayan özellik varmış gibi yazılmaz.
- Onaylanmış Issue/roadmap bağlantısı olmayan hedef **planlanıyor** olarak gösterilmez.
- Emin olunmayan davranış **doğrulanmadı** olarak işaretlenir ve doğrulama yöntemi yazılır.
- Private deployment kanıtı public belgeye secret, domain, ID, kullanıcı veya production verisi taşımadan özetlenir.

## Değişiklik - Belge Matrisi

| Değişiklik | Aynı PR'da kontrol edilecek belgeler |
|---|---|
| Base Compose servisi, port, volume, network veya env | `README.md`, `README.en.md`, `PLATFORM-CAPABILITIES*.md`, `CONFIG.md`, `DEPLOYMENT.md`, `CHANGELOG.md` |
| Coolify kaynak/kurulum davranışı | `COOLIFY.md`, `docs/TURKCE-KURULUM.md`, `docs/ENGLISH-SETUP.md`, `docs/TROUBLESHOOTING*.md`, `CHANGELOG.md` |
| Auth, API key, JWT veya secret modeli | `CONFIG.md`, iki kurulum rehberi, `SECURITY.md`, gerekirse migration/rollback |
| Backup, restore, migration veya PostgreSQL upgrade | `OPERATIONS.md`, `MIGRATION.md`, `DEPLOYMENT.md`, `CHANGELOG.md` |
| Image/tag güncellemesi | `CHANGELOG.md`, `versions.md`, capability/uyumluluk notları |
| Yeni veya kaldırılan özellik | Türkçe/İngilizce README, iki capability belgesi, config ve operasyon belgeleri |
| CI, contribution veya AI-agent kuralı | `AGENTS.md`, `CONTRIBUTING.md`, PR şablonu |
| Upstream aday değişiklik | `UPSTREAM-CONTRIBUTIONS.md`, ilgili Issue/PR bağlantısı |
| Private testten public community yayınına geçiş | `COMMUNITY-PUBLICATION-FLOW.md`, `DISCUSSIONS.md`, `CHANGELOG.md`, ilgili roadmap/capability belgeleri |

Etkilenmeyen belge için PR açıklamasında kısa gerekçe yazılır. “Belge gerekmiyor” işaretlemek inceleme sorumluluğunu kaldırmaz.

## Degisiklik Gecmisi Baglama Kurali

Davranis, kurulum, port, domain, proxy, secret, backup, migration, dashboard
veya kabul testi mantigi degistiginde `CHANGELOG.md` ana tarihsel indeks olarak
guncellenir. Ilgili rehberler de kendi iclerinden bu changelog kaydina geri
baglanir.

Her boyle PR su sorulara kisa cevap vermelidir:

1. Eski yapi neydi?
2. Eski yapida hangi hata veya belirsizlik goruldu?
3. Yeni yapi neyi degistiriyor?
4. Kullanicinin yapmasi gereken net aksiyon nedir?
5. Hangi belgeler bu degisiklige baglandi?

Bu cevaplar kullaniciyi terminal loglarina bogmadan okunabilir olmalidir. Detay
gerekiyorsa changelog ana kayit, rehberler ise pratik uygulama sayfasi olarak
kalir.

## Testten Merge'e Akış

1. Davranış ve etkilenen belgeler değişiklik başlamadan sınıflandırılır.
2. Kod/config ve test aynı branch'te hazırlanır.
3. Test sonucu yalnız gerçekten çalıştırılan komut ve ortamla raporlanır.
4. İlgili Türkçe ve İngilizce belgeler aynı PR'da güncellenir.
5. Capability durumu kanıta göre değiştirilir; CI sonucu production kanıtı olarak yazılmaz.
6. Image veya operasyon sözleşmesi değiştiyse `CHANGELOG.md` ve `versions.md` güncellenir.
7. CI, link ve secret kontrolleri geçmeden merge edilmez.
8. Canlı deploy ayrı onaya tabidir. Smoke sonrası yeni kanıt gerekiyorsa takip PR'ı açılır.

## Private Testten Public Yayına Akış

Private test sunucusunda geliştirilen bir iş public community'de doğrudan
"tamamlandı" diye yayınlanmaz. Önce private kanıt kaydedilir, sonra yeniden
kullanılabilir kısım sanitize edilir, ardından public PR içinde roadmap,
capability ve changelog bağlantıları güncellenir.

Kalıcı kural ve yayın sırası:
[COMMUNITY-PUBLICATION-FLOW.md](./COMMUNITY-PUBLICATION-FLOW.md).

GitHub Discussions kategori ve iki dilli duyuru sablonlari:
[DISCUSSIONS.md](./DISCUSSIONS.md).

Yeni PC'ye klonlayan bir geliştirici veya AI agent, geçmiş sohbeti değil repo
dokümanlarını kaynak kabul eder. Bu nedenle gelecekte hatırlanması gereken her
karar ilgili MD dosyasına yazılır.

## Release ve Deployment Sonrası

- Main'e merge edilmiş fakat henüz canlı doğrulanmamış davranış **runtime doğrulandı** olarak yazılmaz.
- Canlı smoke sonucu commit SHA, tarih, seçilen overlay ve read-only kontrollerle kaydedilir.
- Başarısız veya rollback edilen özellik production-ready olarak gösterilmez.
- Private runbook ayrıntıları private repoda kalır; public belgede yalnız genellenebilir sonuç yer alır.

## English Summary

Code, Compose, scripts, and tests are not complete until affected documentation is updated in the same pull request. Repository presence, CI validation, and production runtime proof are separate evidence levels. Unsupported features must be marked **not provided**, uncertain behavior **unverified**, and planned work must link to an accepted Issue or roadmap item. After a separately approved deployment, runtime claims require commit, overlay, health, read-only smoke, persistence, and rollback evidence.
