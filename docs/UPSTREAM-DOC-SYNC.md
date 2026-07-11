# Upstream Documentation Sync

Bu repo Supabase'in resmî belgelerini kontrolsüz biçimde kopyalayıp otomatik çevirmeye çalışmaz. Kaynak içerik değişikliklerini izler ve insan incelemesi gereken bir görev açar.

## İzlenen Kaynak

- Repo: [`supabase/supabase`](https://github.com/supabase/supabase)
- Dal: `master`
- Dosya: `README.md`
- Kaydedilen son çeviri commit'i: `cf17967a3a46c6efa2d8875bb1839333e417f31e`

## Otomasyon

`.github/workflows/check-upstream-readme.yml` her pazartesi ve manuel çalıştırmada:

1. Resmî README'yi son değiştiren commit'i GitHub API'den alır.
2. Repoda kayıtlı çeviri commit'iyle karşılaştırır.
3. Değişiklik varsa tek bir `upstream-doc-update` Issue'su açar veya mevcut Issue'ya yorum ekler.
4. Kaynak diff bağlantısını Issue'ya ekler.

## Neden Türkçe Çeviri Otomatik Merge Edilmiyor?

Kod ve güvenlik terimlerinde yanlış makine çevirisi kullanıcıyı hatalı kuruluma yönlendirebilir. Bu nedenle otomasyon değişikliği bildirir; maintainer şu dosyaları aynı PR içinde elle kontrol eder:

- `docs/SUPABASE-RESMI-README-TR.md`
- `README.md`
- `README.en.md`
- İlgili kurulum ve operasyon belgeleri

PR, kaynak commit bağlantısını günceller ve CI geçtikten sonra birleştirilir.

## Manual Check

```bash
sh scripts/check-upstream-readme.sh
```

Script değişiklik yoksa `up-to-date`, değişiklik varsa eski ve yeni commit SHA'larını yazdırır ve `2` koduyla çıkar.
