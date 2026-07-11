# Supabase Upstream Contribution and Contact Workflow

Topluluk reposundaki her değişiklik Supabase'e otomatik gönderilmez. Every community change is not automatically submitted to Supabase.

## Doğru Kanalı Seç / Choose the Correct Channel

| Amaç / Purpose | Kanal / Channel |
|---|---|
| Topluluğu ve self-host deneyimini tanıtmak | Supabase GitHub Discussions |
| Tekrar üretilebilir bir Supabase hatası bildirmek | İlgili resmî reponun GitHub Issues bölümü |
| Test edilmiş genel bir düzeltme göndermek | İlgili resmî repoya Pull Request |
| Kullanım sorusu veya yardım istemek | GitHub Discussions veya Discord |
| Supabase dokümanını düzeltmek | `supabase/supabase` içindeki docs katkı süreci |

Tanıtım mesajı için uygun mevcut konu: [Self-hosting: What's working (and what's not)?](https://github.com/orgs/supabase/discussions/39820).

## Upstream Adayı Olma Koşulları

- Sorun ilgili resmî Supabase reposunun güncel varsayılan dalında tekrar üretilir.
- Çözüm müşteri, domain, Coolify kaynağı veya Türkiye topluluk markasına bağlı değildir.
- Benzer açık/kapalı Issue ve PR'lar aranmıştır.
- Minimal tekrar üretim veya test vardır.
- Değişiklik hedef reponun güncel lisans, contribution ve test kurallarına uyar.
- Özel altyapı bilgisi, secret, üretim logu veya müşteri verisi içermez.

## Teknik Katkı Akışı

1. Topluluk PR'ı `upstream-candidate` etiketi alır.
2. Hata güncel upstream üzerinde tekrar doğrulanır.
3. Doğru repo seçilir: `supabase/supabase`, `supabase/auth`, `supabase/realtime`, `supabase/storage`, `supabase/edge-runtime` vb.
4. `akin-umit/supabase` veya ilgili repo forkunda temiz bir branch açılır.
5. Yalnız genel çözüm ve test taşınır; deployment ve topluluk branding'i taşınmaz.
6. Maintainer diff, test, lisans ve secret kontrolünü tamamlar.
7. Kullanıcıdan kamuya açık gönderim için son onay alınır.
8. Issue/PR açılır ve topluluk PR'ına karşılıklı bağlantı eklenir.
9. Sonuç `upstream-opened`, `upstream-merged` veya `upstream-declined` olarak kaydedilir.

Supabase maintainerları nihai kabul yetkisine sahiptir. Topluluk reposunda bir değişikliğin merge edilmesi upstream kabul garantisi değildir.

## Supabase'e İlk Tanıtım Mesajı / Initial Introduction Draft

Bu metin, proje yayınlandıktan ve kurulum en az bir temiz sunucuda yeniden doğrulandıktan sonra GitHub Discussion'a yorum olarak gönderilebilir:

```markdown
Hi Supabase team and community,

We have started **Supabase Turkiye Community**, an independent community project focused on Turkish-first documentation and reproducible self-hosting workflows:

https://github.com/akin-umit/supabase-turkiye-community

Our goal is to help Turkish-speaking developers understand and operate the official open-source Supabase stack on their own infrastructure, initially covering Docker Compose and Coolify. The repository includes beginner-oriented Turkish guides, visual setup references, secret generation, deployment checks, backup/restore guidance, migration notes, and common failure diagnostics.

We clearly state that the project is independent, not Supabase Cloud, and not an official Supabase regional representative. We retain upstream attribution and use a separate clean fork for any upstream contribution.

When we find generic improvements, our workflow is to reproduce them against the current upstream version, remove deployment-specific details, add tests or a minimal reproduction, and submit focused PRs to the relevant Supabase repository.

We would appreciate guidance on the best way to keep this Turkish community resource aligned with upstream self-hosting changes and whether there is an appropriate community resources section where it may be listed after further validation.

Thank you for making the self-hosted stack available to the community.
```

## Hata Bildirimi Şablonu / Bug Report Draft

```markdown
### Summary
One-sentence description of the upstream problem.

### Upstream version
Exact commit SHA or release of the official Supabase configuration.

### Reproduction
1. Minimal environment and commands
2. Expected result
3. Actual result

### Evidence
Sanitized logs with no domains, credentials, IDs, or user data.

### Proposed fix
Root cause, focused change, compatibility impact, and rollback.

### Validation
Tests and clean-environment reproduction results.
```

## PR Açıklaması / Pull Request Draft

```markdown
## Problem
Describe the reproducible upstream behavior and link the issue.

## Change
Explain the minimal implementation without community-specific behavior.

## Test plan
List automated tests and manual clean-environment checks.

## Compatibility and rollback
State affected services, configuration changes, and rollback path.
```

## Göndermeden Önce

- Proje linki herkese açık ve CI yeşil olmalı.
- README İngilizce olarak anlaşılır olmalı.
- Gerçek alan adı, secret veya özel repo bağlantısı bulunmamalı.
- Tanıtım mesajında “official”, “partner” veya “approved” iddiası kullanılmamalı.
- Aynı mesaj birden fazla Issue/Discussion altında spam olarak paylaşılmamalı.
- Gönderimden hemen önce Supabase'in güncel contribution kuralları yeniden okunmalı.
