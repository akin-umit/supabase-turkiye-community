# Sorun Giderme

[English](./TROUBLESHOOTING.en.md)

Bu sayfa, kurulum yapan kisinin hata mesajlari arasinda kaybolmamasi icin kisa
karar agaci verir. Secret, gercek domain ve production veri paylasma.

## Once Ayir

1. `https://supabase.example.com` hangi HTTP kodunu donduruyor?
2. Coolify deploy edilen commit'i son beklenen commit mi?
3. Compose dosyasi degisiklikten sonra `Reload Compose File` ve `Save` ile
   yeniden yuklendi mi?
4. Public domain yalniz `kong` servisine mi bagli?
5. Domain backend/internal portu `8000` mi?

## Yaygin Belirtiler

| Belirti | Muhtemel neden | Ne yapmali |
|---|---|---|
| `503 Service Unavailable` | Coolify proxy saglikli backend bulamiyor. | `kong` health, domain-service eslesmesi, internal port `8000`, restart sayilari ve deploy commit kontrol edilir. |
| `http://supabase.example.com:8000` Coolify login acar | Host port 8000 Coolify katmanina ait. | Bu adres kullanilmaz; public HTTPS domaini `kong:8000` backend'ine route edilir. |
| `401 Basic` | Studio girisi korumali ve route calisiyor. | Deployment kullanici adi/parolasi ile giris yap. |
| `401 Key` | API key olmadan beklenen ret. | Anon/service/publishable/secret key smoke testini kontrollu ortamda yap. |
| `missing function name in request` | Edge Runtime'a ulasildi, function path eksik. | Bilinen function path'i ile test et. |
| `name resolution failed` | Compose network aliasi eksik veya eski compose calisiyor. | `supabase-studio`, `supabase-edge-functions`, `realtime-dev.supabase-realtime` aliaslarini kontrol et. |

## Neden Bu Ayarlar Degisti?

Kisa cevap: Eski yapi bazi Coolify kurulumlarinda calisiyor gibi gorunse de,
host portu ve proxy backend portu karisinca kullanici ya Coolify login ekranina
gidiyor ya da public HTTPS domaini `503` donduruyordu.

- Kong host port yayini base Compose'tan ayrildi.
- Coolify domaini yalniz `kong` servisine baglanacak sekilde netlestirildi.
- Backend/internal portun `8000` oldugu acik yazildi.
- Gate 3 read-only route stabil olmadan Gate 4 yazmali testlerin
  calistirilmamasi kural haline getirildi.

Bu degisiklikler Supabase API davranisini degistirmek icin degil, public route
ve operator kabul surecini daha tahmin edilebilir yapmak icindir.

## Gate Sirasi

- **Gate 3 read-only:** route, health ve beklenen ret kodlari. Veri yazmaz.
- **Gate 4 temporary-data:** sentetik Auth user, Storage bucket, Function invoke
  ve Realtime channel olusturur; sonunda temizler.
- **Gate 5 Studio UI:** Basic auth sonrasi Studio sayfalarini gorsel ve
  davranissal olarak kontrol eder.

Gate 3 stabil degilse Gate 4 calistirma.

## Rapor Yazarken

- HTTP kodunu, hangi endpointi ve beklenen/gercek sonucu yaz.
- Secret degeri, cookie, token, gercek musteri verisi veya private domain
  paylasma.
- `calisiyor` demek icin en az deploy commit, service health ve smoke kaniti
  gerekir.
