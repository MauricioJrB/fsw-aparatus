import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import ServiceItem from '@/app/_components/service-item';
import Footer from '@/app/_components/footer';
import CopyPhoneButton from '@/app/_components/copy-phone-button';

interface PageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async (props: PageProps) => {
  const { id } = await props.params;

  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      {/* Banner */}
      <div className="relative h-[280px] w-full">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="bg-background/80 absolute top-5 left-5 z-10 rounded-full backdrop-blur-sm"
        >
          <Link href="/">
            <ArrowLeftIcon size={20} />
          </Link>
        </Button>

        <Image src={barbershop.imageUrl} alt={barbershop.name} fill className="object-cover" />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-1 flex-col gap-6 px-5 py-6">
        {/* Nome e Endereço */}
        <div>
          <h1 className="text-foreground text-2xl font-bold">{barbershop.name}</h1>
          <p className="text-muted-foreground text-sm">{barbershop.address}</p>
        </div>

        {/* Sobre Nós */}
        <div>
          <h2 className="text-foreground mb-3 text-sm font-semibold uppercase">Sobre nós</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{barbershop.description}</p>
        </div>

        {/* Serviços */}
        <div>
          <h2 className="text-foreground mb-4 text-sm font-semibold uppercase">Serviços</h2>
          <div className="space-y-4">
            {barbershop.services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Contato */}
        <div>
          <h2 className="text-foreground mb-4 text-sm font-semibold uppercase">Contato</h2>
          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PhoneIcon size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{phone}</span>
                </div>
                <CopyPhoneButton phone={phone} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default BarbershopPage;
