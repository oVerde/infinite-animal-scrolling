SET check_function_bodies = false;
CREATE TABLE public.gifs (
    id integer NOT NULL,
    url text NOT NULL,
    category character varying(255) NOT NULL
);
CREATE FUNCTION public.get_random_gifs(category_input text) RETURNS SETOF public.gifs
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
  IF category_input IS NULL OR category_input = '' THEN
    RETURN QUERY
    SELECT *
    FROM gifs
    ORDER BY RANDOM();
  ELSE
    RETURN QUERY
    SELECT *
    FROM gifs
    WHERE category = category_input
    ORDER BY RANDOM();
  END IF;
END;
$$;
CREATE SEQUENCE public.gifs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.gifs_id_seq OWNED BY public.gifs.id;
ALTER TABLE ONLY public.gifs ALTER COLUMN id SET DEFAULT nextval('public.gifs_id_seq'::regclass);
ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_pkey PRIMARY KEY (id);
