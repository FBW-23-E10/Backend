# MYSQL Workshop

## demo


## Creating a database and adding tables

```
create database records;
use records;


create table bands (
id int not null auto_increment,
name VARCHAR(255) NOT NULL,
primary key (id)
);

create table albums(
id int not null auto_increment,
name varchar(255) not null,
release_year int,
band_id int not null,
primary key (id),
foreign key (band_id) references band(id)
)
```

## adding data to tables

```
insert into bands (name)   //insert into TABLE NAME (COLUMN)
values('scooter');         // VALUES


insert into bands (name)
values('pink floyd'),('gorillaz');  //adding multiple VALUES to the same column
```

## querying

### SELECT

```

// select COLUMN from a TABLE

select * from bands         // select all columns from a table


select * from bands limit 2; // select all columns from a table but show only the first 2

select name from bands ; // select the NAME column from a table


select id as 'ID', name as 'Band Name'    // formats the name of the returned columns
from bands;


select * from bands order by name;      // selects all columns from the bands table and orders them by name
select * from bands order by name desc;      // selects all columns from the bands table and orders them by name in a descending order
```

```
insert into albums (name,release_year,band_id)
values ('hyper hyper',1990,1),
	('how much is the fish',2000,1),
    ('wall',2000,2),
    ('wall',2020,3);


    select * from albums;


    select name from albums;

    select distinct name from albums;



update albums
set release_year=1900
where id = 1;

select * from albums;



//FILTERING

SELECT * FROM albums
WHERE release_year ‹ 2000;

SELECT * FROM albums
WHERE name LIKE '%er%';

SELECT * FROM albums
WHERE name LIKE '%er%' or band_id=2;


SELECT * FROM albums
WHERE
release_year = 1984 AND band_id = 1;



SELECT * FROM albums
WHERE release_year BETWEEN 2000 AND 2018;



SELECT * FROM albums
WHERE release_year IS NULL;


DELETE FROM albums WHERE id = 5;




// JOINING TABLES

SELECT * FROM bands
JOIN albums ON bands.id = albums.band_id;


//GROUPING

SELECT band_id, COUNT(band_id) FROM albums
GROUP BY band_id;


```
