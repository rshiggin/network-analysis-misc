##Co-occurence network graph with Gephi and Gefx.js   

__This HOW TO is aimed at producing a basic, undirected network graph of connected entities, represented by weighted nodes.__

R packages igraph and rgefx fell short in our tests, with clear deficiencies in the application of standard network graph algorithms and output. Gephi (the Java-based application) and Gefx.js (browser-based viz bundle for Gephi file format) are the quicker and more accessible choice.

####Prepare .csv data:

__a. Edges (or relations) file__    
Each id number must match an entity in the nodes file. Ids can appear multiple times (e.g., Librarian A is paired with Wells library; and Librarian A is paired with Moving Image Archive).

Create file with names connected to IDs.  

_Human Readable file for development_  
```
personID,Person,Affiliation,affD
18,Colin Allen,InPhO,108   
58,Jaimie Murdock,InPhO,108  
27,Bernie Frischer,Informatics,71 
28,Beth Plale,Informatics,71 
29,Matthew Brennan,Informatics,71  
19,Cassidy Sugimoto,ILS,70
```   

_Modify data for Gephi_  
We remove labels (text strings) in the file to be uploaded, leaving only the pair of unique ids. Note: identifying source and target is unnecesary because this is for an undirected network.

```             
personID,affID                     
52,104                  
52,109                    
52,80        
42,78                   
42,89               
31,73                    
31,110
```  

__b. Nodes (or vertices) file__  
This file will deliver our text label information. PersonID and affID are treated the same, reduced to a simple ID.  

_Very important_: Each entity must have a unique id that is matched in the edges file. No duplicates are allowed in nodes file. In other words, each entity can appear only once, with an Id that matches each instance the entity appears in the edges file.
```
id,label
1,Michael Martin
2,Douglas Parks
3,Stacie King
4,Ellen MacKay
```  

####Use Gephi.app to upload and process data

__a. Start with relations. To upload, use File :: Open__ 
Change "Graph Type" to _Undirected_.   
Everything else can be left default.  

![](import.jpg =600x)  

__b. Click Overview tab >> Data table >> Nodes__  

* Highlight and delete any unneeded header rows (e.g., Source, Target)  
* Clear column: "Label". (This prepares for upload of entities file)

![](edgesUP.jpg =600x)   


__c. Import nodes/entities__  

* Use Import Spreadsheet button.
* Select file on local disk. 
* This will populate your labels.

![](importSpread.jpg =600x)   

* Click "Next"

![](spreadSettings.jpg =600x)   

* Leave "id" and "label" checked. 
* Do not check "Force nodes"; we don't want to create new ones.  
* Click "Finish"

![](nodesText.jpg =600x)

Node text labels will sync to node id numbers.

__d. Network analysis__  

![](statistics.jpg =600x)

* Click on top tab, "Data Laboratory"
* Start with Statistics tab on the left
* Run some the network analysis functions shown below.
* This populates our data about the connections among entities.

__e. Create visualization elements__  

![](partition.jpg =600x)  

* Move to "Partition" tab, still with nodes on the far left selected.  
* Hit refresh button to the left of the pull down.  
* Select "Degree" from the pull down menu.  
* Press "Apply" buttom right.  
* Note: Gephi is very flexible. Color tones, degree categories, size of edge lines, etc.   can all be configured, should you wish.  

![](ranking.jpg =600x)

* Move to "Ranking" tab, still with nodes on the far left selected.  
* There are far too many settings to cover here.  
* Let's focus on resizing nodes to match their weight (or importance in the graph).   
* Go to "Weighted Degree" in the pull down menu.  
* On the upper left, select the inverted diamond.  
* You can adjust the size range of nodes (we're choosing 5 - 30).  
* Click "Apply."  

__f. Layout modes__

![](layout.jpg =600x)  

* Move to "Layout" tab. These are algorithm-derived ways to organize nodes and edges.
* There are a limited set of layouts precoded into Gephi.
* Force Atlas or Fruchterman Rheingold are especially useful.
* For this graph we will choose Force Atlas.


####Publish online  

![](graph.jpg =600x)

* Move to "Graph" tab. 
* Use the settings tools along the bottom to configure visual features.
* Make edge lines visible.  
* Change size of labels, such as matching label size to node size.  
* Move nodes around as needed for clarity.  
* Then, Save/Export your graph to .gefx format  

___  


GEFX is a native, self-contained XML file that is compatible with a number of .js viz frameworks.

_A sample of a .gefx file showing both nodes and edges_

```
<?xml version="1.0" encoding="UTF-8"?>
<gexf xmlns="http://www.gexf.net/1.2draft" version="1.2" xmlns:viz="http://www.gexf.net/1.2draft/viz" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd">
  <meta lastmodifieddate="2015-06-27">
    <creator>Gephi 0.8.1</creator>
    <description></description>
  </meta>
  <graph defaultedgetype="undirected" mode="static">
    <attributes class="node" mode="static">
      <attribute id="degree" title="Degree" type="integer">
        <default>0</default>
      </attribute>
      <attribute id="weighted degree" title="Weighted Degree" type="double">
        <default>0.0</default>
      </attribute>
      <attribute id="eccentricity" title="Eccentricity" type="double">
        <default>0.0</default>
      </attribute>
      <attribute id="closnesscentrality" title="Closeness Centrality" type="double">
        <default>0.0</default>
      </attribute>
      <attribute id="betweenesscentrality" title="Betweenness Centrality" type="double">
        <default>0.0</default>
      </attribute>
    </attributes>
    <nodes>
      <node id="52" label="Alan Burdette">
        <attvalues>
          <attvalue for="degree" value="3"></attvalue>
          <attvalue for="weighted degree" value="3.0"></attvalue>
          <attvalue for="eccentricity" value="10.0"></attvalue>
          <attvalue for="closnesscentrality" value="5.264150943396227"></attvalue>
          <attvalue for="betweenesscentrality" value="163.80656185919347"></attvalue>
        </attvalues>
        <viz:size value="11.954546"></viz:size>
        <viz:position x="-189.46667" y="133.95032" z="0.0"></viz:position>
        <viz:color r="111" g="1" b="221"></viz:color>
      </node>
      <node id="104" label="EVIA">
        <attvalues>
          <attvalue for="degree" value="4"></attvalue>
          <attvalue for="weighted degree" value="4.0"></attvalue>
          <attvalue for="eccentricity" value="9.0"></attvalue>
          <attvalue for="closnesscentrality" value="4.462264150943396"></attvalue>
          <attvalue for="betweenesscentrality" value="470.2359602729844"></attvalue>
        </attvalues>
        <viz:size value="14.272728"></viz:size>
        <viz:position x="-73.3141" y="110.02479" z="0.0"></viz:position>
        <viz:color r="221" g="1" b="111"></viz:color>
      </node>
      <node id="109" label="Media Data Preservation Initiative ">
        <attvalues>
          <attvalue for="degree" value="5"></attvalue>
          <attvalue for="weighted degree" value="5.0"></attvalue>
          <attvalue for="eccentricity" value="9.0"></attvalue>
          <attvalue for="closnesscentrality" value="4.952830188679245"></attvalue>
          <attvalue for="betweenesscentrality" value="614.0829392915861"></attvalue>
        </attvalues>
        <viz:size value="16.590908"></viz:size>
        <viz:position x="-257.76984" y="189.43059" z="0.0"></viz:position>
        <viz:color r="1" g="221" b="111"></viz:color>
      </node>
       <edges>
      <edge source="52" target="104">
        <attvalues></attvalues>
      </edge>
      <edge source="52" target="109">
        <attvalues></attvalues>
      </edge>
      <edge source="52" target="80">
        <attvalues></attvalues>
      </edge>
      <edge source="42" target="78">
        <attvalues></attvalues>
      </edge>
      <edge source="42" target="89">
        <attvalues></attvalues>
      </edge>
      <edge source="31" target="73">
        <attvalues></attvalues>
      </edge>
      <edge source="31" target="110">
        <attvalues></attvalues>
      </edge>
```  
      

Make sure you have a local copy of the gefx.js package  
[github.com/raphv/gexf-js](https://github.com/raphv/gexf-js)

* Save your Gephi .gefx output to the top folder of the gefx.js package.

![](configjs.jpg =600x)

* In config.js file change external file pointer to yourfilename.gefx.
* Select preferences in index.html (or leave as default).  

```
<div id="vizcontainer" style="width:100%; height:100% padding-top:100px">
        <div id="zonecentre" class="gradient">
            <canvas id="carte" width="0" height="0"></canvas>
            <ul id="ctlzoom">
                <li>
                    <a href="#" id="zoomPlusButton" title="S'approcher"> </a>
                </li>
                <li id="zoomSliderzone">
                    <div id="zoomSlider"></div>
                </li>
                <li>
                    <a href="#" id="zoomMinusButton" title="S'éloigner"> </a>
                </li>
                <li>
                    <a href="#" id="lensButton"> </a>
                </li>
                <li>
                    <a href="#" id="edgesButton"> </a>
                </li>
            </ul>
        </div>
    <div id="overviewzone" class="gradient">
            <canvas id="overview" width="0" height="0"></canvas>
        </div>
		
        <div id="leftcolumn">
            <div id="unfold">
                <a href="#" id="aUnfold" class="rightarrow"> </a>
            </div>
            <div id="leftcontent"></div>
     </div>
        <!-- Navigation -->  

<div id="titlebar">
		 <!--	=========================================================================
         <div id="maintitle">
             <h1><a href="http://gephi.org/" target="_blank" title="Made with Gephi">Gephi: JavaScript GEXF Viewer</a></h1>
         </div>
         =========================================================================  --> 
```

Open index.html in browser to test.

[www.indiana.edu/~cyberdh/dhnet/](http://www.indiana.edu/~cyberdh/dhnet)
