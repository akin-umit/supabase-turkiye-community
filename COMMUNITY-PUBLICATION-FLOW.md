# Community Yayin Akisi / Community Publication Flow

Bu belge, private test sunucusunda yapilan isin public community planina,
dokumantasyona, forum/Discussion guncellemelerine ve gelecekteki AI/operator
devrine nasil tasinacagini tanimlar.

English summary: this document defines how private test-server work becomes
public community planning, documentation, forum updates, and future AI/operator
handoff context.

## Amac / Purpose

Projede uc ayri kanit seviyesi vardir:

1. **Planlandi:** fikir yol haritasina alindi, fakat henuz calisan uygulama
   kaniti yok.
2. **Private dogrulandi:** degisiklik private test/deployment ortaminda var ve
   ilgili private kontrollerden gecti.
3. **Public community yayinlandi:** genellenmis ve gizli bilgiden arindirilmis
   degisiklik bu repoya dokuman, test ve public-safe kanitla merge edildi.

Bu seviyeler karistirilmaz. Private test sonucu otomatik public ozellik iddiasi
degildir; public planda yazan hedef de ozelligin hazir oldugu anlamina gelmez.

English summary: planned, privately validated, and publicly released work are
separate evidence levels and must not be presented as the same thing.

## Turkce Yayin Onceligi

Bu topluluk reposunun ana kitlesi Turkce konusan self-host kullanicilardir.
Bu nedenle:

- Forum, GitHub Discussion, roadmap, changelog ve kurulum notlari once Turkce
  yazilir.
- Ingilizce metin gerekiyorsa Turkce bolumden sonra ozet veya ceviri olarak
  eklenir.
- Ingilizce belgede yer alan her kurulum, hata cozumu, guvenlik uyarisi,
  yedekleme, migration veya dashboard siniri Turkce belgede de bulunmalidir.
- Public duyuru yapmadan once ilgili Turkce ana belge guncellenir veya neden
  etkilenmedigi PR aciklamasinda yazilir.
- AI ile gelistiren katilimcilar Turkce kullaniciyi sadece Ingilizce kaynaga
  yonlendiremez.

## Private Test Sunucusundan Community'ye Aktarma Kurali

Private test sunucusunda bir ozellik, fix veya operasyon dersi gelistirildiginde:

1. Private sonucu private repoda commit, tarih, rollback notu ve net kontrollerle
   kaydet.
2. Sonucu `private-only`, `community-candidate` veya `upstream-candidate` olarak
   siniflandir.
3. `community-candidate` ise sadece yeniden kullanilabilir davranisi temiz bir
   public branch'e tasi.
4. Private domain, proje adi, server ID, credential, log, ekran goruntusu ve
   operasyon kanitlarini neutral orneklerle degistir.
5. Etkilenen public belgeleri ayni pull request icinde guncelle.
6. Degisikligi `CHANGELOG.md` ve yeni operatorun okuyacagi pratik rehberden
   linkle.
7. Forum veya GitHub Discussion duyurusunu public PR merge edildikten sonra yap;
   daha erken yayinlanacaksa net sekilde roadmap/feedback taslagi olarak
   etiketle.

## Zorunlu Public Dokuman Guncellemeleri

Her public ozellik veya plan guncellemesi su dosyalari kontrol eder:

| Degisiklik tipi | Zorunlu public dokumanlar |
|---|---|
| Dashboard veya Studio davranisi | `DASHBOARD-ROADMAP*.md`, `PLATFORM-CAPABILITIES*.md`, `CHANGELOG.md` |
| Compose, Coolify, domain, proxy veya port davranisi | `COOLIFY.md`, `DEPLOYMENT.md`, `docs/TROUBLESHOOTING*.md`, `CHANGELOG.md` |
| Secret, API key, JWT, Auth veya Edge Functions | `CONFIG.md`, `SECURITY.md`, `FUNCTION-SECRETS*.md`, kurulum rehberleri, `CHANGELOG.md` |
| Backup, restore, migration veya upgrade | `OPERATIONS.md`, `RESTORE-DRILL*.md`, `MIGRATION.md`, `CHANGELOG.md` |
| Multi-project/control-plane plani | `DASHBOARD-ROADMAP*.md`, `PLATFORM-CAPABILITIES*.md`, `COMMUNITY-PUBLICATION-FLOW.md` |
| Contributor veya AI workflow | `AGENTS.md`, `CONTRIBUTING.md`, `DOCUMENTATION-MAINTENANCE.md`, bu dosya |

Listelenen bir dokuman guncellenmediyse PR aciklamasi nedenini yazmak zorundadir.

## Forum ve Discussion Yayin Kurali

Public community paylasimlari kisa, kanitli ve ana repo belgelerine bagli
olmalidir. Paylasim sirasi:

1. **Roadmap duyurusu:** problemi, hedefi ve henuz hazir olmayan kismini anlat.
2. **Dogrulama duyurusu:** private veya staging testin gectigini, private kanit
   veya secret paylasmadan yaz.
3. **Release duyurusu:** merge edilen public PR'i, changelog kaydini, kurulum
   rehberini ve sorun giderme rehberini linkle.
4. **Geri bildirim duyurusu:** kullanicidan secretlari silinmis ekran goruntusu,
   tekrar uretim adimlari ve deployment ortami iste.

Private deployment ekran goruntuleri, gercek domainler, loglar, credentiallar,
server ID'leri, Coolify ID'leri veya private commit linkleri yayinlanmaz.

Discussion kategori plani ve iki dilli paylasim sablonlari:
[DISCUSSIONS.md](./DISCUSSIONS.md).

## AI ve Yeni Makine Devir Kurali

Repo, yeni bir bilgisayara clone edildiginde veya yeni bir AI agent devraldiginda
anlasilir kalmalidir. Minimum okuma sirasi:

1. `AGENTS.md`
2. `README.md`
3. `PLATFORM-CAPABILITIES.md`
4. `DASHBOARD-ROADMAP.md`
5. `CHANGELOG.md`
6. `DOCUMENTATION-MAINTENANCE.md`
7. Bu dosya
8. Goreve ozel rehber: `COOLIFY.md`, `FUNCTION-SECRETS.md`, `OPERATIONS.md`
   veya `docs/TROUBLESHOOTING.md`

AI agent sohbet gecmisini tek dogru kaynak olarak kullanamaz. Gelecekteki is icin
onemli olan bilgi yukaridaki repo dokumanlarindan birine yazilir.

## Kabul Checklist'i

Bir degisiklik public community yayini icin ancak su maddeler dogruysa hazirdir:

- Ozellik durumu `planlandi`, `kismi`, `kanit-only`, `dogrulandi`,
  `sunulmuyor` veya `dogrulanmadi` olarak etiketlendi.
- Eski davranis, degisiklik sebebi, yeni davranis ve kullanici aksiyonu yazildi.
- `CHANGELOG.md` etkilenen pratik dokumanlara link veriyor.
- Davranis iki kitleyi de etkiliyorsa Turkce ana belge ve Ingilizce ayna
  birlikte guncellendi.
- Secret ve private veri taramasi temiz.
- CI ve Markdown link kontrolleri geciyor.
- Forum veya Discussion taslagi ana repo sayfalarina link veriyor.
