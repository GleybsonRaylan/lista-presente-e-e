import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import WeddingCountdown from './components/WeddingCountdown';
import TimeTogether from './components/TimeTogether';
import GiftGrid from './components/GiftGrid';
import GiftModal from './components/GiftModal';
import OtherGiftSection from './components/OtherGiftSection';
import Footer from './components/Footer';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import type { Gift } from './types/gift';

export default function App() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setLoadError(true);
      return;
    }

    let isMounted = true;

    async function fetchGifts() {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: true });

      if (!isMounted) return;

      if (error) {
        setLoadError(true);
      } else {
        setGifts(data ?? []);
        setLoadError(false);
      }
      setIsLoading(false);
    }

    fetchGifts();

    // Mantém a lista sincronizada em tempo real: se outro convidado
    // escolher um presente, a quantidade atualiza sozinha na tela.
    const channel = supabase
      .channel('gifts-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'gifts' },
        (payload) => {
          const updated = payload.new as Gift;
          setGifts((current) =>
            current.map((gift) => (gift.id === updated.id ? updated : gift))
          );
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  function handleGiftReserved(giftId: string, remaining: number) {
    setGifts((current) =>
      current.map((gift) => (gift.id === giftId ? { ...gift, quantity: remaining } : gift))
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Hero />

      <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        {!isSupabaseConfigured && (
          <div className="mb-10 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 font-body text-sm text-amber-900">
            O Supabase ainda não foi configurado. Preencha as variáveis de ambiente descritas em{' '}
            <code>.env.example</code> para que a lista de presentes funcione.
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <WeddingCountdown />
          <TimeTogether />
        </div>

        <section id="presentes" className="mt-16 scroll-mt-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl italic text-charcoal sm:text-4xl">
              Nossa lista de presentes
            </h2>
            <p className="mt-2 font-body text-sm text-ink/60">
              Toque em um presente para escolhê-lo.
            </p>
          </div>

          <GiftGrid
            gifts={gifts}
            isLoading={isLoading}
            loadError={loadError}
            onSelect={setSelectedGift}
          />
        </section>

        <section className="mt-12">
          <OtherGiftSection />
        </section>
      </main>

      <Footer />

      {selectedGift && (
        <GiftModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onGiftReserved={handleGiftReserved}
        />
      )}
    </div>
  );
}
