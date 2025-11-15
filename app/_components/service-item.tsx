"use client";

import Image from "next/image";
import { BarbershopService } from "@/app/generated/prisma/client";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Imagem do serviço */}
        <div className="relative h-[112px] w-[112px] shrink-0 overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Conteúdo do serviço */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>

          {/* Preço e Botão */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              R$ {(service.priceInCents / 100).toFixed(2)}
            </span>
            <Button className="bg-primary hover:bg-primary/90" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mt-4" />
    </div>
  );
};

export default ServiceItem;
