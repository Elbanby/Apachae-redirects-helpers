# Apache Redirects Helpers Scripts

## Perquisites
   1- node Js.  (minumum v8.12.0)
   2- git

### About

These are utils scripts that facilitates the Apache redirects setup. They are
bunch of smaller scripts that do one thing at a given time, to help you apply
and test the redirects.

#### How to use
This repo should contain branches for each release with the Apache redirects
problems resolved.

Each branch inherits from Master. Please keep Master clean and don't add anything
to it. Just keep the helpers scripts originally in the file.

  1- You will need to add all the redirects url AKA 'From' urls. to the resource
     folder. A file extension could be  (.txt or .csv)

![tree](https://user-images.githubusercontent.com/25230868/49466689-b104b700-f7ce-11e8-959f-83209a13b85e.png)

     
  2- You will need to add all the redirect to url AKA 'To' urls. to the resource
     folder.  A file extension could be  (.txt or .csv)


  3- Then run the concat.js to create a from to relation for the urls

   `node concat.js from.csv to.csv concatenated_result.txt <delimiter>`
    
   ఠ_ఠ N.B:
     Delimiter defaults to a single space. You could however have any delimiter you specify

  4- Then we run append.js Which is a helper Js script that append to the
       end of a file.

   `node append.js 'From'  'Absolute path (to)';`
    
   You might need to run this script twice if you have both content and dam

   5- Now you can operate the last script which automates the redirects testing
      https://github.com/Elbanby/Redirects-Reporter
