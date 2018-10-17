# Apache Redirects Helpers Scripts

## Perquisites
    1- node Js
    2- git

### About

These are utils scripts that facilitates the Apache redirects setup. They are
bunch of smaller scripts that do one thing at a given time, to help you apply
and test the redirects.

#### How to use
This repo should contain branches for each release with the Apache redirects
problems resolved.

Each branch inherits for Master. Please keep Master clean and don't add anything
to it. Just keep the helpers scripts originally in the file.

  1- You will need to add all the redirects url AKA 'From' urls. to the resource
     folder. Must be a csv

     //TODO include an image of how the file should look like

  2- You will need to add all the redirect to url AKA 'To' urls. to the resource
     folder. Must be a csv  

     //TODO include an image of how the file should look like

  3- Then run the concat.js to create a from to relation for the urls

    ```
    JS
      node concat.js ./resources/from.csv ./resources/to.csv ./results/ <delimiter>
    ```
    ఠ_ఠ N.B:
    The delimiter should generally be a space. Hence, in linux to add an empty
    space we do

    ```
      \ ;
      👀 notice there is exactly one space after the back slash
    ```

    You could however have any delimiter you specify

    4- Then we run appendFile.js Which is a helper Js script that append to the
       end of a file.

    ```
      node appendFile.js 'filePath (from)'  'filePath (to)';
    ```
    You might need to run this script twice if you have both content and dam

   5- Now you can operate the last script which automates the redirects testing

    //TODO: Describe how it works and modify script. 
