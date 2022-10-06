PGDMP     %    8    
        	    z         
   raceteamsc    14.5    14.4 :    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16394 
   raceteamsc    DATABASE     U   CREATE DATABASE raceteamsc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE raceteamsc;
                postgres    false            �            1259    16401    Branchs    TABLE     �   CREATE TABLE public."Branchs" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Branchs";
       public         heap    postgres    false            �            1259    16400    Branchs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Branchs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Branchs_id_seq";
       public          postgres    false    211            C           0    0    Branchs_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Branchs_id_seq" OWNED BY public."Branchs".id;
          public          postgres    false    210            �            1259    16453    Cars    TABLE       CREATE TABLE public."Cars" (
    id integer NOT NULL,
    member_id integer NOT NULL,
    plate character varying(255) NOT NULL,
    instagram character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Cars";
       public         heap    postgres    false            �            1259    16452    Cars_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Cars_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Cars_id_seq";
       public          postgres    false    219            D           0    0    Cars_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Cars_id_seq" OWNED BY public."Cars".id;
          public          postgres    false    218            �            1259    16420    Events    TABLE     �  CREATE TABLE public."Events" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    sympla_link character varying(255),
    branch_id integer,
    local_id integer NOT NULL,
    payable boolean,
    media_url character varying(255),
    price double precision,
    active boolean NOT NULL,
    date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Events";
       public         heap    postgres    false            �            1259    16466    EventsConfirmations    TABLE     ,  CREATE TABLE public."EventsConfirmations" (
    member_id integer NOT NULL,
    event_id integer NOT NULL,
    confirmed boolean NOT NULL,
    checkin boolean NOT NULL,
    paid boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 )   DROP TABLE public."EventsConfirmations";
       public         heap    postgres    false            �            1259    16481    EventsPayments    TABLE     �  CREATE TABLE public."EventsPayments" (
    pref_id character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    order_id character varying(255),
    pay_id character varying(255),
    member_id integer NOT NULL,
    event_id integer NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."EventsPayments";
       public         heap    postgres    false            �            1259    16419    Events_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Events_id_seq";
       public          postgres    false    215            E           0    0    Events_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Events_id_seq" OWNED BY public."Events".id;
          public          postgres    false    214            �            1259    16408    Locals    TABLE     V  CREATE TABLE public."Locals" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    branch_id integer,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    address character varying(255)
);
    DROP TABLE public."Locals";
       public         heap    postgres    false            �            1259    16407    Locals_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Locals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Locals_id_seq";
       public          postgres    false    213            F           0    0    Locals_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Locals_id_seq" OWNED BY public."Locals".id;
          public          postgres    false    212            �            1259    16439    Members    TABLE     g  CREATE TABLE public."Members" (
    id integer NOT NULL,
    branch_id integer NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    number character varying(255) NOT NULL,
    instagram character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Members";
       public         heap    postgres    false            �            1259    16438    Members_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Members_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Members_id_seq";
       public          postgres    false    217            G           0    0    Members_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Members_id_seq" OWNED BY public."Members".id;
          public          postgres    false    216            �            1259    16395    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �           2604    16498 
   Branchs id    DEFAULT     l   ALTER TABLE ONLY public."Branchs" ALTER COLUMN id SET DEFAULT nextval('public."Branchs_id_seq"'::regclass);
 ;   ALTER TABLE public."Branchs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �           2604    16499    Cars id    DEFAULT     f   ALTER TABLE ONLY public."Cars" ALTER COLUMN id SET DEFAULT nextval('public."Cars_id_seq"'::regclass);
 8   ALTER TABLE public."Cars" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16500 	   Events id    DEFAULT     j   ALTER TABLE ONLY public."Events" ALTER COLUMN id SET DEFAULT nextval('public."Events_id_seq"'::regclass);
 :   ALTER TABLE public."Events" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    16501 	   Locals id    DEFAULT     j   ALTER TABLE ONLY public."Locals" ALTER COLUMN id SET DEFAULT nextval('public."Locals_id_seq"'::regclass);
 :   ALTER TABLE public."Locals" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            �           2604    16502 
   Members id    DEFAULT     l   ALTER TABLE ONLY public."Members" ALTER COLUMN id SET DEFAULT nextval('public."Members_id_seq"'::regclass);
 ;   ALTER TABLE public."Members" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            2          0    16401    Branchs 
   TABLE DATA           G   COPY public."Branchs" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211   eH       :          0    16453    Cars 
   TABLE DATA           [   COPY public."Cars" (id, member_id, plate, instagram, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   �H       6          0    16420    Events 
   TABLE DATA           �   COPY public."Events" (id, name, description, sympla_link, branch_id, local_id, payable, media_url, price, active, date, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �H       ;          0    16466    EventsConfirmations 
   TABLE DATA           x   COPY public."EventsConfirmations" (member_id, event_id, confirmed, checkin, paid, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   TI       <          0    16481    EventsPayments 
   TABLE DATA           �   COPY public."EventsPayments" (pref_id, url, order_id, pay_id, member_id, event_id, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   �I       4          0    16408    Locals 
   TABLE DATA           o   COPY public."Locals" (id, name, branch_id, latitude, longitude, "createdAt", "updatedAt", address) FROM stdin;
    public          postgres    false    213   �I       8          0    16439    Members 
   TABLE DATA           k   COPY public."Members" (id, branch_id, name, role, number, instagram, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   �J       0          0    16395    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    209   �J       H           0    0    Branchs_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Branchs_id_seq"', 6, true);
          public          postgres    false    210            I           0    0    Cars_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Cars_id_seq"', 1, true);
          public          postgres    false    218            J           0    0    Events_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Events_id_seq"', 18, true);
          public          postgres    false    214            K           0    0    Locals_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Locals_id_seq"', 27, true);
          public          postgres    false    212            L           0    0    Members_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Members_id_seq"', 10, true);
          public          postgres    false    216            �           2606    16406    Branchs Branchs_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Branchs"
    ADD CONSTRAINT "Branchs_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Branchs" DROP CONSTRAINT "Branchs_pkey";
       public            postgres    false    211            �           2606    16460    Cars Cars_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "Cars_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Cars" DROP CONSTRAINT "Cars_pkey";
       public            postgres    false    219            �           2606    16470 ,   EventsConfirmations EventsConfirmations_pkey 
   CONSTRAINT        ALTER TABLE ONLY public."EventsConfirmations"
    ADD CONSTRAINT "EventsConfirmations_pkey" PRIMARY KEY (member_id, event_id);
 Z   ALTER TABLE ONLY public."EventsConfirmations" DROP CONSTRAINT "EventsConfirmations_pkey";
       public            postgres    false    220    220            �           2606    16487 "   EventsPayments EventsPayments_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."EventsPayments"
    ADD CONSTRAINT "EventsPayments_pkey" PRIMARY KEY (pref_id, member_id, event_id);
 P   ALTER TABLE ONLY public."EventsPayments" DROP CONSTRAINT "EventsPayments_pkey";
       public            postgres    false    221    221    221            �           2606    16427    Events Events_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_pkey";
       public            postgres    false    215            �           2606    16413    Locals Locals_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Locals"
    ADD CONSTRAINT "Locals_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Locals" DROP CONSTRAINT "Locals_pkey";
       public            postgres    false    213            �           2606    16446    Members Members_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_pkey";
       public            postgres    false    217            �           2606    16399     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    209            �           1259    16503    fki_Locals_branch_id_fkey    INDEX     U   CREATE INDEX "fki_Locals_branch_id_fkey" ON public."Locals" USING btree (branch_id);
 /   DROP INDEX public."fki_Locals_branch_id_fkey";
       public            postgres    false    213            �           2606    16461    Cars Cars_member_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "Cars_member_id_fkey" FOREIGN KEY (member_id) REFERENCES public."Members"(id);
 F   ALTER TABLE ONLY public."Cars" DROP CONSTRAINT "Cars_member_id_fkey";
       public          postgres    false    217    219    3477            �           2606    16476 5   EventsConfirmations EventsConfirmations_event_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EventsConfirmations"
    ADD CONSTRAINT "EventsConfirmations_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public."Events"(id);
 c   ALTER TABLE ONLY public."EventsConfirmations" DROP CONSTRAINT "EventsConfirmations_event_id_fkey";
       public          postgres    false    3475    215    220            �           2606    16471 6   EventsConfirmations EventsConfirmations_member_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EventsConfirmations"
    ADD CONSTRAINT "EventsConfirmations_member_id_fkey" FOREIGN KEY (member_id) REFERENCES public."Members"(id);
 d   ALTER TABLE ONLY public."EventsConfirmations" DROP CONSTRAINT "EventsConfirmations_member_id_fkey";
       public          postgres    false    3477    220    217            �           2606    16493 +   EventsPayments EventsPayments_event_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EventsPayments"
    ADD CONSTRAINT "EventsPayments_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public."Events"(id);
 Y   ALTER TABLE ONLY public."EventsPayments" DROP CONSTRAINT "EventsPayments_event_id_fkey";
       public          postgres    false    3475    221    215            �           2606    16488 ,   EventsPayments EventsPayments_member_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EventsPayments"
    ADD CONSTRAINT "EventsPayments_member_id_fkey" FOREIGN KEY (member_id) REFERENCES public."Members"(id);
 Z   ALTER TABLE ONLY public."EventsPayments" DROP CONSTRAINT "EventsPayments_member_id_fkey";
       public          postgres    false    217    3477    221            �           2606    16428    Events Events_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES public."Branchs"(id);
 J   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_branch_id_fkey";
       public          postgres    false    3470    215    211            �           2606    16433    Events Events_local_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_local_id_fkey" FOREIGN KEY (local_id) REFERENCES public."Locals"(id);
 I   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_local_id_fkey";
       public          postgres    false    3472    213    215            �           2606    16414    Locals Locals_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Locals"
    ADD CONSTRAINT "Locals_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES public."Branchs"(id);
 J   ALTER TABLE ONLY public."Locals" DROP CONSTRAINT "Locals_branch_id_fkey";
       public          postgres    false    213    3470    211            �           2606    16447    Members Members_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES public."Branchs"(id);
 L   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_branch_id_fkey";
       public          postgres    false    211    217    3470            2   X   x�3�����+���I�4202�50�52S04�2��2��336276�50�/�e�間_���wxsA~Nf1E��q��&%^�O�11z\\\ �1�      :      x������ � �      6   Z   x�34�t�K��+)������!3N##mhffbia`nffnh��U�,�4202�54�50S02�26�2 ���� aada�=... ;�c      ;   .   x�3�44�,�LB###]C]#C+ �50�!����� g�      <      x������ � �      4   �   x����N�0Dk�+��e�z�q�k�N��4&�":tA��!����# DC�4�hF�7�<�����.�4��.G�wơ�@ܰq!6.5>"�I"s�h0 � 3Di[,���\�ھ���^���>�8�0���Gݜ���)g�op)����6 �6���ƻ+�]�QOg�C=��3tz�H�.O�������BV      8   X   x�3�4�t�(�,.�L��LL����455��0��4434�L�I�%e&s����)�YX�X��Y�E���r��qqq ��z      0   l   x�32022050546���ĒTݤ�ļ���b.#��9�ɉ9��F0�ԲԼic�tnjnRj��	L>9�$�l����̢�Ē��<�f(J+s������� >�E�     