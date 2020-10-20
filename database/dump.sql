--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.gyms ALTER COLUMN "gymId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."users_userId_seq";
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public."gyms_gymId_seq";
DROP TABLE IF EXISTS public.gyms;
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: gyms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gyms (
    "gymId" integer NOT NULL,
    "yelpId" text NOT NULL,
    "gymName" text NOT NULL,
    "yelpUrl" text NOT NULL,
    "gymImageUrl" text NOT NULL,
    distance real NOT NULL,
    "photosUrl" json NOT NULL,
    hours json NOT NULL,
    location json NOT NULL,
    coordinates json NOT NULL,
    reviews json NOT NULL,
    price text NOT NULL,
    rating numeric NOT NULL
);


--
-- Name: gyms_gymId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."gyms_gymId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gyms_gymId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."gyms_gymId_seq" OWNED BY public.gyms."gymId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "distanceRadius" numeric NOT NULL,
    "userName" text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: gyms gymId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gyms ALTER COLUMN "gymId" SET DEFAULT nextval('public."gyms_gymId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: gyms; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gyms ("gymId", "yelpId", "gymName", "yelpUrl", "gymImageUrl", distance, "photosUrl", hours, location, coordinates, reviews, price, rating) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "distanceRadius", "userName") FROM stdin;
1	5	Wayne D
2	15	Guest
\.


--
-- Name: gyms_gymId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."gyms_gymId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

