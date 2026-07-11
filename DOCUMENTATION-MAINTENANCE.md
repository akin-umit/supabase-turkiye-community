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
| Base Compose servisi, port, volume, network veya env | `README.md`, `README.en.md`, `PLATFORM-CAPABILITIES*.md`, `CONFIG.md`, `DEPLOYMENT.md` |
| Coolify kaynak/kurulum davranışı | `COOLIFY.md`, `docs/TURKCE-KURULUM.md`, `docs/ENGLISH-SETUP.md` |
| Auth, API key, JWT veya secret modeli | `CONFIG.md`, iki kurulum rehberi, `SECURITY.md`, gerekirse migration/rollback |
| Backup, restore, migration veya PostgreSQL upgrade | `OPERATIONS.md`, `MIGRATION.md`, `DEPLOYMENT.md`, `CHANGELOG.md` |
| Image/tag güncellemesi | `CHANGELOG.md`, `versions.md`, capability/uyumluluk notları |
| Yeni veya kaldırılan özellik | Türkçe/İngilizce README, iki capability belgesi, config ve operasyon belgeleri |
| CI, contribution veya AI-agent kuralı | `AGENTS.md`, `CONTRIBUTING.md`, PR şablonu |
| Upstream aday değişiklik | `UPSTREAM-CONTRIBUTIONS.md`, ilgili Issue/PR bağlantısı |

Etkilenmeyen belge için PR açıklamasında kısa gerekçe yazılır. “Belge gerekmiyor” işaretlemek inceleme sorumluluğunu kaldırmaz.

## Testten Merge'e Akış

1. Davranış ve etkilenen belgeler değişiklik başlamadan sınıflandırılır.
2. Kod/config ve test aynı branch'te hazırlanır.
3. Test sonucu yalnız gerçekten çalıştırılan komut ve ortamla raporlanır.
4. İlgili Türkçe ve İngilizce belgeler aynı PR'da güncellenir.
5. Capability durumu kanıta göre değiştirilir; CI sonucu production kanıtı olarak yazılmaz.
6. Image veya operasyon sözleşmesi değiştiyse `CHANGELOG.md` ve `versions.md` güncellenir.
7. CI, link ve secret kontrolleri geçmeden merge edilmez.
8. Canlı deploy ayrı onaya tabidir. Smoke sonrası yeni kanıt gerekiyorsa takip PR'ı açılır.

## Release ve Deployment Sonrası

- Main'e merge edilmiş fakat henüz canlı doğrulanmamış davranış **runtime doğrulandı** olarak yazılmaz.
- Canlı smoke sonucu commit SHA, tarih, seçilen overlay ve read-only kontrollerle kaydedilir.
- Başarısız veya rollback edilen özellik production-ready olarak gösterilmez.
- Private runbook ayrıntıları private repoda kalır; public belgede yalnız genellenebilir sonuç yer alır.

## English Summary

Code, Compose, scripts, and tests are not complete until affected documentation is updated in the same pull request. Repository presence, CI validation, and production runtime proof are separate evidence levels. Unsupported features must be marked **not provided**, uncertain behavior **unverified**, and planned work must link to an accepted Issue or roadmap item. After a separately approved deployment, runtime claims require commit, overlay, health, read-only smoke, persistence, and rollback evidence.
