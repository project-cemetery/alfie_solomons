CREATE TABLE public.exchange_rate (
  "from"      char(3)                     NOT NULL,
  "to"        char(3)                     NOT NULL,
  "collectAt" timestamp without time zone NOT NULL,
  "rate"      double precision            NOT NULL
);

ALTER TABLE ONLY public.exchange_rate
  ADD CONSTRAINT "PK_exchange_rate" PRIMARY KEY ("from", "to", "collectAt");

#DOWN

DROP TABLE public.exchange_rate;
