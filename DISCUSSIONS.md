# GitHub Discussions Plan / GitHub Tartisma Plani

This repository uses GitHub Discussions as the public update and feedback area.
Every important update must link back to the canonical repository documents so
the community does not depend on chat history, screenshots, or private context.

Bu repo, herkese acik duyuru ve geri bildirim alani olarak GitHub Discussions
kullanir. Her onemli guncelleme, toplulugun sohbet gecmisi veya ozel baglama
bagimli kalmamasi icin ana repo belgelerine link vermelidir.

## Recommended Categories / Onerilen Kategoriler

| Category | Turkish purpose | English purpose | Use for |
|---|---|---|---|
| Announcements / Duyurular | Maintainer duyurulari ve surum ozetleri | Maintainer announcements and release summaries | Merged PRs, public releases, security-safe status updates |
| Roadmap / Yol Haritasi | Planlanan isler ve oncelik sirasi | Planned work and priority order | Dashboard phases, control-plane planning, capability gaps |
| Help / Yardim | Kurulum ve hata cozum sorulari | Setup and troubleshooting questions | Coolify, Docker, 503, API keys, Storage/Auth issues |
| Ideas / Fikirler | Yeni ozellik ve iyilestirme onerileri | Feature and improvement ideas | Community requests before issue/PR scope is clear |
| Development Log / Gelistirme Gunlugu | Yapilan islerin kisa, surekli guncellenen ozeti | Short rolling updates for completed work | Weekly/daily sanitized summaries linked to changelog |
| Show and Tell / Kurulum Paylasimlari | Kullanicilarin kendi kurulum deneyimleri | Community setup stories and demos | Public examples without secrets or private data |

If GitHub Discussions uses only English category titles, put the Turkish label in
the category description. If Turkish titles are used, put the English label in
the description.

GitHub Discussions yalniz Ingilizce kategori basliklariyla kullanilacaksa Turkce
etiket aciklamaya yazilir. Turkce baslik kullanilacaksa Ingilizce etiket
aciklamaya yazilir.

## GitHub Settings Mapping / GitHub Ayar Eslemesi

GitHub discussion categories are repository settings, not repository files.
They must be updated from `Discussions > edit categories` by a repository admin.
If the API later exposes category mutations, this table remains the canonical
mapping for automation.

GitHub discussion kategorileri repository ayaridir, dosya degildir. Repository
admini tarafindan `Discussions > edit categories` ekranindan guncellenmelidir.
API ileride kategori mutasyonlari acarsa otomasyon icin canonical esleme bu
tablodur.

| Current GitHub category | Target display name | Description |
|---|---|---|
| Announcements | Duyurular / Announcements | Maintainer duyurulari, surum ozetleri ve guvenli public durum guncellemeleri. |
| General | Genel / General | Genel topluluk sohbeti; teknik karar gerektiren konular issue veya roadmap basligina tasinir. |
| Ideas | Yol Haritasi ve Fikirler / Roadmap and Ideas | Planlanan isler, oncelikler, dashboard fazlari ve yeni ozellik fikirleri. |
| Q&A | Yardim ve Soru-Cevap / Help and Q&A | Kurulum, Coolify, Docker, 503, API key, Storage/Auth hata cozumleri. |
| Show and tell | Kurulum Paylasimlari / Show and Tell | Kullanicilarin gizli veri icermeyen kurulum deneyimleri ve demolar. |
| Polls | Anketler / Polls | Topluluk oylamalari ve oncelik yoklamalari. |

Optional extra category if GitHub allows adding it:

| New category | Display name | Description |
|---|---|---|
| Development Log | Gelistirme Gunlugu / Development Log | Yapilan islerin kisa, surekli guncellenen, PR/changelog baglantili ozeti. |

## Live Discussion Threads / Canli Tartisma Basliklari

These are the first canonical public threads. Use them instead of scattering
updates across unrelated channels.

Ilk canonical public basliklar bunlardir. Guncellemeleri daginik kanallara
yazmak yerine bu basliklara baglayin.

| Thread | Purpose |
|---|---|
| [Gelistirme Gunlugu / Development Log](https://github.com/akin-umit/supabase-turkiye-community/discussions/18) | Short bilingual summaries of completed work, validation status, and links to changelog/roadmap/PRs. |
| [Yol Haritasi ve Katki Plani / Roadmap and Contribution Plan](https://github.com/akin-umit/supabase-turkiye-community/discussions/19) | Public roadmap discussion, feature ideas, contribution planning, and upstream-candidate coordination. |

## What Goes Into Discussions / Discussions'a Ne Yazilir?

Every public update should be short and linked:

- What changed?
- Why did the old behavior change?
- What is verified, partial, planned, or not provided?
- Which PR, changelog entry, roadmap, or guide explains the details?
- What should users test or report?

Her public guncelleme kisa ve linkli olmalidir:

- Ne degisti?
- Eski davranis neden degisti?
- Ne dogrulandi, ne kismi, ne plan, ne sunulmuyor?
- Detay hangi PR, changelog, roadmap veya rehberde?
- Kullanicilar neyi test etmeli veya bildirmeli?

## Development Log Template / Gelistirme Gunlugu Sablonu

```md
## TR

### Kisa ozet

Bu guncellemede <konu> uzerinde calisildi.

### Durum

- Tamamlanan:
- Kismi:
- Siradaki:
- Dogrulanmayan:

### Baglantilar

- Changelog:
- Roadmap:
- Rehber:
- PR:

## EN

### Short summary

This update worked on <topic>.

### Status

- Completed:
- Partial:
- Next:
- Unverified:

### Links

- Changelog:
- Roadmap:
- Guide:
- PR:
```

## Release Announcement Template / Surum Duyurusu Sablonu

```md
## TR

### Ne yayinlandi?

<Kisa aciklama>

### Kullaniciyi ilgilendiren kisim

<Aksiyon veya dikkat edilmesi gereken konu>

### Kanit ve belgeler

- Changelog:
- Kurulum/operasyon rehberi:
- Capability/roadmap:
- PR:

## EN

### What was released?

<Short explanation>

### User impact

<Action or important note>

### Evidence and docs

- Changelog:
- Setup/operations guide:
- Capability/roadmap:
- PR:
```

## Safety Rules / Guvenlik Kurallari

Do not post:

- real domains, server IPs, Coolify resource IDs, deployment IDs, container IDs,
  or private repository links;
- credentials, tokens, keys, cookies, `.env` values, backup contents, database
  rows, or production logs;
- screenshots containing private infrastructure data;
- claims that a feature is production-ready without linked evidence.

Yayinlanmayacaklar:

- gercek domain, server IP, Coolify resource ID, deployment ID, container ID veya
  private repo linki;
- credential, token, key, cookie, `.env` degeri, backup icerigi, database satiri
  veya production logu;
- private altyapi verisi iceren ekran goruntusu;
- kanit linki olmayan production-ready iddiasi.

## Canonical Links / Ana Baglantilar

- [Changelog](./CHANGELOG.md)
- [Dashboard roadmap](./DASHBOARD-ROADMAP.md)
- [Platform capabilities](./PLATFORM-CAPABILITIES.md)
- [Community publication flow](./COMMUNITY-PUBLICATION-FLOW.md)
- [Documentation maintenance contract](./DOCUMENTATION-MAINTENANCE.md)
