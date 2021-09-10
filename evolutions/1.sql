CREATE TABLE public.exchange_rate (
    "from"   char(3)                     NOT NULL,
    "to"     char(3)                     NOT NULL,
    "source" varchar                     NOT NULL,
    "date"   timestamp without time zone NOT NULL,
    "rate"   double precision            NOT NULL
);

ALTER TABLE ONLY public.exchange_rate
    ADD CONSTRAINT "PK_exchange_rate" PRIMARY KEY ("from", "to", "date");

#DOWN

DROP TABLE public.exchange_rate;
