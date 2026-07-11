# Upstream Contribution Workflow

Topluluk reposundaki her degisiklik Supabase'e otomatik gonderilmez.

## Upstream adayi olma kosullari

- Sorun resmi Supabase reposunun guncel surumunde tekrar uretilir.
- Cozum musteri/domain/Coolify kimligine bagli degildir.
- Degisiklik ilgili upstream reponun lisans ve contribution kurallarina uyar.
- Minimal test veya tekrar uretim senaryosu vardir.
- Upstream changelog ve mevcut issue/PR'lar kontrol edilmistir.

## Akis

1. Topluluk PR'i `upstream-candidate` etiketi alir.
2. Maintainer temiz bir upstream branch hazirlar.
3. Yalniz genel cozum ve testler tasinir; topluluk branding'i tasinmaz.
4. Ilgili repo secilir: `supabase/supabase`, `supabase/auth`, `supabase/realtime`, `supabase/storage`, `supabase/edge-runtime` vb.
5. Upstream issue/PR topluluk PR'ina baglanir.
6. Sonuc etiketi kaydedilir: `upstream-opened`, `upstream-merged`, `upstream-declined`.

Supabase maintainerlari nihai kabul yetkisine sahiptir. Topluluk reposunda merge edilmis olmasi upstream kabul garantisi degildir.
