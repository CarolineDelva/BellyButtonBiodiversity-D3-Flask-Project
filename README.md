# Belly Button Biodiversity

I completed this project during my time at the [Columbia Engineering Data Analytics Bootcamp](https://bootcamp.cvn.columbia.edu/data/nyc/landing/?s=Google-Brand&pkw=%2Bdata%20%2Banalytics%20%2Bcolumbia&pcrid=392444639754&pmt=b&utm_source=google&utm_medium=cpc&utm_campaign=%5BS%5D_GRD_Data_Brand_ALL_NYC_BMM_New&utm_term=%2Bdata%20%2Banalytics%20%2Bcolumbia&utm_content=392444639754&s=google&k=%2Bdata%20%2Banalytics%20%2Bcolumbia&gclid=Cj0KCQiA2b7uBRDsARIsAEE9XpFH-2wU0-_7jtxCV_PCkGBR0prlyKtvpF2-nAWU1tO4oYci5h1QStsaAsg5EALw_wcB&gclsrc=aw.ds) located in New York, NY.

#### -- Project Status: [Completed]



![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)


## Project Description

The purpose of this project is to build an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/) for a full stack application and deploy this application to Heroku.

The visuals have the following characteristics 

* A PIE chart that uses `sample_values` as the values for the PIE chart from(`/samples/<sample>`) route to display the top 10 samples.

* A Bubble Chart that uses data from your samples route (`/samples/<sample>`) to display each sample.

* A display of the sample metadata from the route `/metadata/<sample>`.

* A display of each key/value pair from the metadata JSON object somewhere on the page.

* A Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the Weekly Washing Frequency obtained from the `/metadata/<sample>`route.

* All charts should update when a new sample is selected.



## Needed for project

* Don't forget to `pip install -r requirements.txt` before you start your server.

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js Documentation](https://plot.ly/javascript/) when building the plots.

- - -


 ![PIE Chart](Images/pie_chart.png)


  ![Bubble Chart](Images/bubble_chart.png)
