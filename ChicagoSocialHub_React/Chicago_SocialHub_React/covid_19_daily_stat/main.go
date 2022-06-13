package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	_ "github.com/lib/pq"
)

type CovidDaily []struct {
	Date        string `json:"lab_report_date"`
	TotalCases  string `json:"cases_total"`
	TotalDeaths string `json:"deaths_total"`
}

type Location struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

type CovidCCVI []struct {
	GeographyType      string   `json:"geoar_type"`
	CommunityAreaOrZip string   `json:"community_area_or_zip"`
	CcviScore          string   `json:"ccvi_score"`
	CcviCategory       string   `json:"ccvi_category"`
	Location           Location `json:"location"`
}

type Covidweekly []struct {
	zipcode1           string `json:"zip_code"`
	week1              string `json:"week_end"`
	cases_weekly1      string `json:"cases_weekly"`
	cases_cumulative1  string `json:"cases_cumulative"`
	deaths_weekly1     string `json:"deaths_weekly"`
	deaths_cumulative1 string `json:"deaths_cumulative"`
	population1        string `json:"population"`
	tests_weekly1      string `json:"tests_weekly"`
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "HaveFun"
	dbname   = "chicago_BI"
)

func main() {

	fmt.Printf(" Start updating of DB Table")
	connStr := "user=postgres password=HaveFun host=host.docker.internal port=54320 sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Printf("Connection to postgres established")

	createDB := `CREATE DATABASE covid_stat`
	_, _ = db.Exec(createDB)

	db.Close()

	connStr = "user=postgres dbname=covid_stat password=HaveFun host=host.docker.internal port=54320 sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	//creating a table

	createSql5 := `CREATE TABLE IF NOT EXISTS "covid_daily_stat" ("reportdate" VARCHAR(255),
	"cases_total" integer,
	"deaths_total" integer);`
	_, createSqlErr6 := db.Exec(createSql5)
	if createSqlErr6 != nil {
		panic(createSqlErr6)
	}
	// we are taking the data from portal

	var url3 = "https://data.cityofchicago.org/resource/naz8-j4nc.json"
	res, err23 := http.Get(url3)
	if err23 != nil {
		log.Fatal(err23)
	}
	body3, _ := ioutil.ReadAll(res.Body)

	var covidarry1 CovidDaily
	json.Unmarshal(body3, &covidarry1)

	for i := 0; i < len(covidarry1); i++ {
		sql := `INSERT into covid_daily_stat("reportdate","cases_total","deaths_total") VALUES($1, $2, $3)`
		_, err18 := db.Exec(sql, covidarry1[i].Date, covidarry1[i].TotalCases, covidarry1[i].TotalDeaths)
		if err18 != nil {
			panic(err18)
		}
	}

	//creating a table

	createSql := `CREATE TABLE IF NOT EXISTS "covid_stat_heatmap" (
	"id" SERIAL,	
	"geographytype" VARCHAR(255),
	"zipcode" VARCHAR(255),
	"ccviscore" DOUBLE PRECISION,
	"ccvicategory" VARCHAR(255),
	"latitude" DOUBLE PRECISION,
	"longitude" DOUBLE PRECISION,
	PRIMARY KEY ("id"));`
	_, createSqlErr := db.Exec(createSql)
	if createSqlErr != nil {
		panic(createSqlErr)
	}
	var url1 = "https://data.cityofchicago.org/resource/xhc6-88s9.json"
	res, err = http.Get(url1)
	if err != nil {
		log.Fatal(err)
	}

	body, _ := ioutil.ReadAll(res.Body)

	var covidDataArray CovidCCVI
	json.Unmarshal(body, &covidDataArray)

	for i := 0; i < len(covidDataArray); i++ {
		CommunityAreaOrZipcode := covidDataArray[i].CommunityAreaOrZip
		ccviScore, _ := strconv.ParseFloat(covidDataArray[i].CcviScore, 64)
		lat := covidDataArray[i].Location.Coordinates[1]
		lng := covidDataArray[i].Location.Coordinates[0]
		sql := `INSERT into covid_stat_heatmap("geographytype","zipcode","ccviscore","ccvicategory","latitude","longitude") VALUES($1, $2, $3, $4, $5, $6)`
		_, err := db.Exec(sql, covidDataArray[i].GeographyType, CommunityAreaOrZipcode, ccviScore, covidDataArray[i].CcviCategory, lat, lng)
		if err != nil {
			panic(err)
		}

	}

	fmt.Printf(" Uodation of table covid_daily_stat completed")
}
