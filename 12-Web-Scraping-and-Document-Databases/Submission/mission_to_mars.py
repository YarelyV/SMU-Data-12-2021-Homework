


import pandas as pd
from bs4 import BeautifulSoup
from splinter import Browser
from webdriver_manager.chrome import ChromeDriverManager
from IPython.display import display, Image
import time
import pymongo


# # Scraping
class Scrape():

    def getData(self):
        #enabling chrome browser
        executable_path = {'executable_path': ChromeDriverManager().install()}
        browser = Browser('chrome', **executable_path, headless=False)


        # ### NASA Mars News

        #connecting to browser
        url = 'https://redplanetscience.com'
        browser.visit(url)
        time.sleep(3)
        html = browser.html
        soup = BeautifulSoup(html)

        news_title = soup.find_all("div", {"class":"content_title"})[0].text

        news_p= soup.find_all("div", {"class":"article_teaser_body"})[0].text



    


        # ### JPL Mars Space Images-Featured Image


        #connecting to browser
        url = 'https://spaceimages-mars.com/'
        browser.visit(url)
        html=browser.html
        soup= BeautifulSoup(html)



        img = soup.find("img", {"class":"headerimage"})["src"]



        featured_image_url = url+img





        # ### Mars Facts


        #naming browser to connect to
        url='https://galaxyfacts-mars.com/'





        df= pd.read_html(url)





        #making it to a dataframe
        MarsFacts=df[1]
        MarsFacts.columns=["Type", "Stats"]





        #convert to HTML String
        mf_html=MarsFacts.to_html(index=False)


        # ### Mars Hemispheres




        #connecting to browser
        url = 'https://marshemispheres.com/'
        browser.visit(url)
        html=browser.html
        soup= BeautifulSoup(html)





        items = soup.find_all("div", {"class": "item"})




        hemi_info = []

        for item in items:
            # parse page 1
            item_link = item.find("div", {"class", "description"}).find("a")
            item_url = url + item_link["href"]
            item_title = item_link.text.strip().strip("Enhanced").strip()
            
            # visit the found URL
            browser.visit(item_url)
            html2 = browser.html
            time.sleep(3)
            soup2 = BeautifulSoup(html2)
            hemi_url = url + soup2.find("img", {"class": "wide-image"})["src"]
            
            data = {"title": item_title, "img_url": hemi_url}
            hemi_info.append(data)




        browser.quit()





        scraped = {}
        scraped["news_p"] = news_p
        scraped["news_title"] = news_title
        scraped["featured_image_url"] = featured_image_url
        scraped["mars_facts"] = mf_html
        scraped["hemispheres"] = hemi_info



        return(scraped)



    # # Create connection variable
    # conn = 'mongodb://localhost:27017'

    # # Pass connection to the pymongo instance.
    # client = pymongo.MongoClient(conn)

    # # Connect to a database. Will create one if not already available.
    # db = client.mars_db
    # db.team.drop()
    # db.mars.insert_one(scraped)

