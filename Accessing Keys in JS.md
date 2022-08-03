# Ways of accessing Key in Objects
  - using dor operator
  - using square bracket syntax

associative array in js:
    a way of accessing key in js
    eg.. 
    ```
    obj['key']  = value
    ```
    Advantages:
        -> Special chaacters can be used to make keys
          eg.. 
          ```
          obj['first name'] = 'Jharitosh Pumar ka'
          ```  
        -> obj.key will produce error if key does not exist in object but obj[key] will first take value of key and then look for that key in object.
        eg..
        ```
        var key = 1
        <br>
        var obj = {
          1: 1,
          2: 2,
          ...
        }<br>
        obj.key //will produce error because key does not exist in obj
        obj[key] //will return 1
        ```

# Diffrence between viewpagesource and inspect
  viewpagesource -> Initial static code
  inspect -> dynamic code
