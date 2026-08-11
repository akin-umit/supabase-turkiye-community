# Supabase Turkiye Studio Pro Parity Bulgulari

Bu belge, canli self-host Studio denetiminde gorulen eksikleri public ve gizli bilgi icermeyen sekilde takip eder. Hedef; Supabase Turkiye kurulumunda Supabase Studio'nun faydali Pro/Platform yuzeylerini self-host gerceklerine baglamak, fatura ve Supabase Cloud'a ozel parcalari ise kaldirmak veya yerel karsiliklariyla degistirmektir.

Kural: Bir madde yalnizca kod, test, build/deploy ve canli sayfa dogrulamasi birlikte tamamlandiginda kapatilir.

## 15 Bulgu ve Yapilacak Asamalar

| # | Alan | Bulgu | Yapilacak asama | Durum |
|---|------|-------|-----------------|-------|
| 1 | Auth e-posta sablonlari | Template satirlari detay/default editore acilmiyor; toggle ve satir aksiyonlari kalici davranmiyor. | GoTrue/self-host sablon varsayilanlarini bagla, detay ekranini doldur, toggle save/refetch testini ekle. | Acik |
| 2 | Database settings | Connection logging kaydi basari gosteriyor ama refetch `Failed to retrieve Postgres configuration` hatasina donuyor. | Postgres config read/write endpoint yanitini duzelt, save sonrasi ayni degerleri goster, self-host DB ayar yuzeyini genislet. | Acik |
| 3 | Replication | WAL seviyesi `unknown`, publication table listesi bos, destination formu orijinal Supabase UX'inden kopuk. | WAL/publication/slot verisini gercek Postgres kaynagindan oku, destination dogrulamasini ve gizli alan davranisini duzelt. | Acik |
| 4 | Database backups | `Back up now` `upstream_operation_failed` veriyor; scheduled/PITR/restore recovery point akisi calismiyor. | Backup job runner ve recovery point kaynagini bagla; eksik backend varsa net durum goster; create/list/restore smoke testleri ekle. | Acik |
| 5 | Database migrations | Migration gecmisi gorunmuyor; aktif sidebar secimi hatali gorunebiliyor. | `supabase_migrations.schema_migrations` veya management endpoint uzerinden gecmisi listele; apply sonrasi history refresh ve sidebar state testini ekle. | Acik |
| 6 | Auth provider linkleri | Manual linking ve benzeri linkler kullaniciyi proje disina yonlendiriyor. | Proje ici panel/modal akislari olustur; dokuman linklerini ikincil yardim olarak birak; toggle persistence testlerini ekle. | Acik |
| 7 | Third-party Auth | Third-party provider listesi generic API hatasiyla bos kaliyor. | Self-host provider config response shape'ini duzelt, fallback provider listesi goster, hata mesajini gercek nedene indir. | Acik |
| 8 | Auth gelismis ayarlar | Passkeys, OAuth Server, Sessions, Rate Limits, MFA, URL Config, Attack Protection, Hooks, Audit Logs ve Performance yuzeyleri tamamlanmamis. | Auth modulunu tek paket olarak envanterle; desteklenenleri gercek config'e bagla, desteklenmeyenleri acik self-host siniriyla goster. | Acik |
| 9 | Storage S3 keys | S3 access key olusturma generic API hatasiyla basarisiz. | S3 key create/list/delete endpointlerini ve secret persistence yolunu bagla; Coolify/runtime config koprusu gerekiyorsa tasarla. | Acik |
| 10 | Storage files settings | Image transformation toggle ve global file size limit degismiyor. | Storage config persistence ekle veya runtime-managed ise acik salt-okunur durum goster; save/refetch dogrulamasi yap. | Acik |
| 11 | Observability genel/metrikler | Dashboard kullanim kartlari veri gosterirken detay sayfalari bos, spinner veya `No data` durumunda kaliyor. | Logflare/Vector query source'larini teklestir; time range, urun filtresi ve aggregation mapping'ini duzelt. | Acik |
| 12 | Product observability | Database/Data API/Auth/Storage/Realtime/Functions observability sayfalari gercek aktiviteyle tutarli calismiyor. | Kontrollu smoke dataset ve trafik uret; her urun sayfasinda metrik/log gorunurlugunu canli dogrula. | Acik |
| 13 | Unified logs preview | Eski logs veri gosteriyor ama yeni preview filtreleri ve sorgulari hata/skeleton durumunda kaliyor. | Eski logs query path'iyle unified query builder'i karsilastir; log type, status, method, pathname ve time range filtrelerini duzelt. | Acik |
| 14 | Project settings/add-ons | Project settings, integrations ve add-ons Pro beklentisine gore eksik; bazi alanlar placeholder veya operator-managed kaliyor. | Her settings route'unu upstream/Pro ile karsilastir; self-host karsiligi, operator-managed durumu veya kaldirma kararini yazili hale getir. | Acik |
| 15 | Organization, multi-project, team, usage | Org projects/team/usage/integrations skeleton veya API hatasi veriyor; billing/Cloud izleri self-host urune uymuyor. | Coklu proje, coklu domain, takim/RBAC ve kullanim telemetrisini self-host control-plane mimarisiyle tanimla; billing-only yuzeyleri kaldir veya yerellestir. | Acik |

## Uygulama Sirasi

1. **Kritik API hata temizligi:** Auth templates, Database settings, Third-party Auth, S3 keys ve logs preview generic API hatalari.
2. **Gercek veri baglantisi:** Migration history, backup status, observability ve product metric sayfalari.
3. **Self-host config persistence:** Auth, Storage, Database ve Settings save/refetch akislari.
4. **Pro/Platform UX parity:** Replication, backup/restore, Auth gelismis ayarlar, add-ons ve project settings.
5. **Control-plane mimarisi:** Organization, multi-project, multi-domain, team/RBAC ve Cloud billing parcalarinin yerel karsiliklari.
6. **Final kabul:** Public build, deployment pin, Coolify smoke, authenticated browser smoke ve sayfa sayfa canli kontrol.

## Kabul Kriteri

- Her madde icin degisen dosyalar ve test komutlari yazilir.
- Build ve deployment commit'i gorunur olur.
- Canli Studio sayfasinda kullanici akisi denenir.
- Cloud/fatura-only ekranlar ya kaldirilir ya da self-host karsiligina baglanir.
- Public dokumanda domain, deployment ID, token, secret, container ID veya ozel altyapi adi bulunmaz.
