1. 
  > **Primitive types**
  >
  > Java determines the size of each primitive type. These sizes don’t change from one machine architecture to another as they do in most languages. This size invariance is one reason Java programs are more portable than programs in most other languages.
  >
  > ![](/media/default/thinking_in_java_4_tbl_primitive_types.png)
  >
  > All numeric types are **signed**, so don’t look for unsigned types.
  > 
  > <footer>Thinking in Java (4th Edition), P65</footer>

2. 
  > **High-precision numbers**
  >
  > `BigInteger` supports arbitrary-precision integers. This means that you can accurately represent integral values of any size without losing any information during operations.
  >
  > `BigDecimal` is for arbitrary-precision fixed-point numbers; you can use these for accurate monetary calculations, for example.
  > 
  > <footer>Thinking in Java (4th Edition), P66</footer>

3. 
  > **Default values for primitive members**
  >
  > When a primitive data type is a member of a class, it is guaranteed to get a default value if you do not initialize it.
  >
  > This guarantee **doesn’t** apply to local variables.
  > 
  > <footer>Thinking in Java (4th Edition), P69-70</footer>

4. 
  > `java.lang` is implicitly included in every Java code file
  > 
  > <footer>Thinking in Java (4th Edition), P75</footer>

5. 
  > The default behavior of `equals()` is to compare references. So unless you override `equals()` in your new class you won’t get the desired behavior.
  >
  > <footer>Thinking in Java (4th Edition), P93</footer>

6. 
  > You can apply AND, OR, or NOT to `boolean` values only. You **can’t** use a non-`boolean` as if it were a boolean in a logical expression as you can in C and C++. 
  >
  > A `boolean` value is automatically converted to an appropriate text form if it is used where a String is expected.
  >
  > <footer>Thinking in Java (4th Edition), P94</footer>

7. 
  > **Literals** 
  >
  > ```java
  > // compile error because 0xFF is an integer
  > // literal (java does not have byte literal)
  > byte b = 0xFF;  
  > ```
  >
  > <footer>Thinking in Java (4th Edition), P96</footer>

8. 
  > The `boolean` type is treated as a one-bit value, so it is somewhat different. You can perform a bitwise AND, OR, and XOR, but you can’t perform a bitwise NOT (presumably to prevent confusion with the logical NOT). For `boolean`s, the bitwise operators have the same effect as the logical operators except that they do **not** short circuit. Also, bitwise operations on `boolean`s include an XOR logical operator that is not included under the list of logical operators. You **cannot** use `boolean`s in shift expressions.
  >
  > <footer>Thinking in Java (4th Edition), P98</footer>

9. 
  > The signed right shift `>>` uses **sign extension**. Java has also added the unsigned right shift `>>>`, which uses **zero extension**.
  >
  > If you shift a `char`, `byte`, or `short`, it will be promoted to `int` **before** the shift takes place, and the result will be an `int`. Only the **five** low-order bits of the right-hand side will be used. This prevents you from shifting more than the number of bits in an `int`. If you’re operating on a `long`, you’ll get a `long` result. Only the **six** low-order bits of the right-hand side will be used, so you can’t shift more than the number of bits in a `long`.
  >
  > <footer>Thinking in Java (4th Edition), P98</footer>

10. 
  > Java allows you to cast any primitive type to any other primitive type, except for `boolean`, which doesn’t allow any casting at all.
  >
  > <footer>Thinking in Java (4th Edition), P104</footer>

11. 
  > **Promotion**
  >
  > You’ll discover that if you perform any mathematical or bitwise operations on primitive data types that are smaller than an `int` (that is, `char`, `byte`, or `short`), those values will be promoted to `int` before performing the operations, and the resulting value will be of type `int`. So if you want to **assign back** into the smaller type, you must use a cast. (And, since you’re assigning back into a smaller type, you might be losing information.) 
  >
  > <footer>Thinking in Java (4th Edition), P105</footer>

12. 
  > **Java has no `sizeof`**
  >
  > Java does not need a `sizeof` operator for this purpose, because all the data types are the same size on all machines. You do not need to think about portability on this level—it is designed into the language.
  >
  > <footer>Thinking in Java (4th Edition), P106</footer>

13. 
  > Each overloaded method must take a **unique** list of argument types.
  >
  > <footer>Thinking in Java (4th Edition), P132</footer>

14. 
  > **`finalize` is not a destructor in C++**
  >
  > This is a potential programming pitfall because some programmers, especially C++ programmers, might initially mistake `finalize()` for the destructor in C++, which is a function that is always called when an object is destroyed. It is important to distinguish between C++ and Java here, because in C++, objects always get destroyed (in a bug-free program), whereas in Java, objects do not always get garbage collected. Or, put another way: 
  >
  > 1. Your objects might not get garbage collected.
  > 2. Garbage collection is not destruction.
  >
  > <br>
  > <footer>Thinking in Java (4th Edition), P141-142</footer>

15. 
  > **The termination condition**
  >
  > In general, you can't rely on `finalize()` being called, and you must create separate "cleanup" methods and call them explicitly. So it appears that `finalize()` is only useful for obscure memory cleanup that most programmers will never use. However, there is an interesting use of `finalize()` that does not rely on it being called every time. This is the verification of the **termination condition** of an object.
  >
  > At the point that you're no longer interested in an object—when it’s ready to be cleaned up—that object should be in a state whereby its memory can be safely released. For example, if the object represents an open file, that file should be closed by the programmer before the object is garbage collected. If any portions of the object are not properly cleaned up, then you have a bug in your program that can be very difficult to find. `finalize()` can be used to eventually discover this condition, even if it isn't always called. If one of the finalizations happens to reveal the bug, then you discover the problem, which is all you really care about.
  >
  > <footer>Thinking in Java (4th Edition), P143</footer>

16. 
  > **How a garbage collector works**
  >
  > To understand garbage collection in Java, it’s helpful learn how garbage-collection schemes work in other systems. A simple but slow garbage-collection technique is called **reference counting**.
  >
  > In faster schemes, garbage collection is not based on reference counting. Instead, it is based on the idea that any non-dead object must ultimately be traceable back to a reference that lives either on the stack or in static storage.
  >
  > <footer>Thinking in Java (4th Edition), P145</footer>

17. 
  > **Constructor intialization**
  >
  > The constructor can be used to perform initialization, and this gives you greater flexibility in your programming because you can call methods and perform actions at run time to determine the initial values. There’s one thing to keep in mind, however: You **aren’t** precluding the automatic initialization, which happens before the constructor is entered. So, for example, if you say:
  >
  > ```java
  > public class Counter {
  >     int i;
  >     Counter() { i = 7; }
  >     // ...
  > }
  > ```
  >
  > then `i` will first be initialized to 0, then to 7. This is true with all the primitive types and with object references, including those that are given explicit initialization at the point of definition. For this reason, the compiler doesn’t try to force you to initialize elements in the constructor at any particular place, or before they are used—initialization is already guaranteed.
  >
  > <footer>Thinking in Java (4th Edition), P149</footer>

18. 
  > To summarize the process of creating an object, consider a class called `Dog`:
  >
  > 1. Even though it doesn't explicitly use the `static` keyword, the constructor is actually a `static` method. So the first time an object of type `Dog` is created, or the first time a `static` method or `static` field of class `Dog` is accessed, the Java interpreter must locate `Dog.class`, which it does by searching through the classpath.
  > 2. As `Dog.class` is loaded (creating a `Class` object, which you'll learn about later), all of its `static` initializers are run. Thus, `static` initialization takes place only once, as the `Class` object is loaded for the first time.
  > 3. When you create a `new Dog()`, the construction process for a `Dog` object first allocates enough storage for a `Dog` object on the heap.
  > 4. This storage is wiped to zero, automatically setting all the primitives in that `Dog` object to their default values (zero for numbers and the equivalent for boolean and char) and the references to null.
  > 5. Any initializations that occur at the point of field definition are executed.
  > 6. Constructors are executed.
  >
  > <br>
  > <footer>Thinking in Java (4th Edition), P152</footer>

19. 
  > **Explicit `static` initialization**
  >
  > Java allows you to group other `static` initializations inside a special "`static` clause" (sometimes called a **static block**) in a class. It looks like this:
  >
  > ```java
  > public class Spoon {
  >     static int i;
  >     static {
  >         i = 47;
  >     }
  > }
  > ```
  >
  > It appears to be a method, but it’s just the `static` keyword followed by a block of code. This code, like other `static` initializations, is executed only once: the first time you make an object of that class or the first time you access a `static` member of that class (even if you never make an object of that class).
  >
  > <footer>Thinking in Java (4th Edition), P153</footer>

20. 
  > **Non-`static` instance initialization**
  >
  > Java provides a similar syntax, called **instance initialization**, for initializing non-`static` variables for each object. Here’s an example:
  >
  > ```java
  > class Mug {
  >     Mug(int marker) {
  >         print("Mug(" + marker + ")");
  >     }
  >     void f(int marker) {
  >         print("f(" + marker + ")");
  >     }
  > }
  >
  > public class Mugs {
  >     Mug mug1;
  >     Mug mug2;
  >     {   // instance initialization
  >         mug1 = new Mug(1);
  >         mug2 = new Mug(2);
  >         print("mug1 & mug2 initialized");
  >     }
  >     Mugs() {
  >         print("Mugs()");
  >     }
  >     Mugs(int i) {
  >         print("Mugs(int)");
  >     }
  >     public static void main(String[] args) {
  >         print("Inside main()");
  >         new Mugs();
  >         print("new Mugs() completed");
  >         new Mugs(1);
  >         print("new Mugs(1) completed");
  >     }
  > }
  > ```
  >
  > looks exactly like the static initialization clause except for the missing `static` keyword. This syntax is necessary to support the initialization of **anonymous inner classes**, but it also allows you to guarantee that certain operations occur regardless of which explicit constructor is called. From the output, you can see that the instance initialization clause is executed **before** either one of the constructors.
  >
  > <footer>Thinking in Java (4th Edition), P154-155</footer>

21. 
  > **Variable argument lists**
  >
  > Since all classes are ultimately inherited from the common root class `Object`, you can create a method that takes an array of `Object` and call it like this:
  >
  > ```java
  > class A {}
  > public class VarArgs {
  >     static void printArray(Object[] args) {
  >         for(Object obj : args)
  >         System.out.print(obj + " ");
  >         System.out.println();
  >     }
  >     public static void main(String[] args) {
  >         printArray(new Object[]{
  >             new Integer(47), new Float(3.14), new Double(11.11)
  >         });
  >         printArray(new Object[]{"one", "two", "three" });
  >         printArray(new Object[]{new A(), new A(), new A()});
  >     }
  > }
  > ```
  >
  > You may see pre-Java SE5 code written like the above in order to produce variable argument lists. In Java SE5, however, this long-requested feature was finally added, so you can now use ellipses to define a variable argument list, as you can see in `printArray()`:
  >
  > ```java
  > public class NewVarArgs {
  >     static void printArray(Object... args) {
  >         for(Object obj : args)
  >         System.out.print(obj + " ");
  >         System.out.println();
  >     }
  >     public static void main(String[] args) {
  >         // Can take individual elements:
  >         printArray(new Integer(47), new Float(3.14), new Double(11.11));
  >         printArray(47, 3.14F, 11.11);
  >         printArray("one", "two", "three");
  >         printArray(new A(), new A(), new A());
  >         printArray((Object[])new Integer[]{ 1, 2, 3, 4 });
  >         printArray(); // Empty list is OK
  >     }
  > }
  > ```
  >
  > <footer>Thinking in Java (4th Edition), P159-160</footer>

22. 
  > It's also possible to use the output of `Arrays.asList()` directly, as a `List`, but the underlying representation in this case is the array, which cannot be resized. If you try to `add()` or `delete()` elements in such a list, that would attempt to change the size of an array, so you'll get an `Unsupported Operation` error at run time.
  >
  > <footer>Thinking in Java (4th Edition), P302</footer>

23. 
  > **Explicit type argument specification**
  >
  > A limitation of `Arrays.asList()` is that it takes a best guess about the resulting type of the List, and doesn't pay attention to what you're assigning it to. Sometimes this can cause a problem:
  >
  > ```java
  > import java.util.*;
  >
  > class Snow {}
  > class Powder extends Snow {}
  > class Light extends Powder {}
  > class Heavy extends Powder {}
  > class Crusty extends Snow {}
  > class Slush extends Snow {}
  >
  > public class AsListInference {
  >     public static void main(String[] args) {
  >         List<Snow> snow1 = Arrays.asList(
  >             new Crusty(), new Slush(), new Powder());
  >
  >         // Won't compile:
  >         // List<Snow> snow2 = Arrays.asList(
  >         // new Light(), new Heavy());
  >         // Compiler says:
  >         // found : java.util.List<Powder>
  >         // required: java.util.List<Snow>
  >
  >         // Collections.addAll() doesn't get confused:
  >         List<Snow> snow3 = new ArrayList<Snow>();
  >         Collections.addAll(snow3, new Light(), new Heavy());
  >         // Give a hint using an explicit type argument specification:
  >         List<Snow> snow4 = Arrays.<Snow>asList(new Light(), new Heavy());
  >     }
  > }
  > ```
  >
  > When trying to create `snow2`, `Arrays.asList()` only has types of `Powder`, so it creates a `List<Powder>` rather than a `List<Snow>`, whereas `Collections.addAll()` works fine because it knows from the first argument what the target type is.
  >
  > As you can see from the creation of `snow4`, it's possible to insert a "hint" in the middle of `Arrays.asList()`, to tell the compiler what the actual target type should be for the resulting List type produced by `Arrays.asList()`. This is called an **explicit type argument specification**.
  >
  > <footer>Thinking in Java (4th Edition), P302-303</footer>

24. 
  > If the List produced by `Arrays.asList()` is shuffled directly, it will modify the underlying array, as you can see here:
  >
  > ```java
  > public static void main(String[] args) {
  >     Random rand = new Random(47);
  >     Integer[] ia = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
  >
  >     List<Integer> list1 = new ArrayList<Integer>(Arrays.asList(ia));
  >     System.out.println("Before shuffling: " + list1);
  >     Collections.shuffle(list1, rand);
  >     System.out.println("After shuffling: " + list1);
  >     System.out.println("array: " + Arrays.toString(ia));
  >
  >     List<Integer> list2 = Arrays.asList(ia);
  >     System.out.println("Before shuffling: " + list2);
  >     Collections.shuffle(list2, rand);
  >     System.out.println("After shuffling: " + list2);
  >     System.out.println("array: " + Arrays.toString(ia));
  > }
  > /* Output:
  > Before shuffling: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  > After shuffling: [4, 6, 3, 1, 8, 7, 2, 5, 10, 9]
  > array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  > Before shuffling: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  > After shuffling: [9, 1, 6, 3, 7, 2, 5, 10, 4, 8]
  > array: [9, 1, 6, 3, 7, 2, 5, 10, 4, 8]
  > */
  > ```
  >
  > In the first case, the output of `Arrays.asList()` is handed to the `ArrayList()` constructor, and this creates an `ArrayList` that **references** the elements of `ia`. Shuffling these references doesn't modify the array. However, if you use the result of `Arrays.asList(ia)` directly, shuffling modifies the order of `ia`. It’s important to be aware that `Arrays.asList()` produces a `List` object that uses the underlying array as its physical implementation. If you do anything to that `List` that modifies it, and you don't want the original array modified, you should make a copy into another container.
  >
  > <footer>Thinking in Java (4th Edition), P329-330</footer>

25. 
  > There's no need to use the legacy classes `Vector`, `Hashtable`, and `Stack` in new code.
  >
  > <footer>Thinking in Java (4th Edition), P331</footer>

26. 
  > **Simple Container Taxonomy**
  >
  > ![](/media/default/thinking_in_java_4_fig_simple_container_taxonomy.png)
  >
  > The dotted boxes represent interfaces, and the solid boxes are regular (concrete) classes. The dotted lines with hollow arrows indicate that a particular class is implementing an interface. The solid arrows show that a class can produce objects of the class the arrow is pointing to. For example, any `Collection` can produce an `Iterator`, and a `List` can produce a `ListIterator` (as well as an ordinary `Iterator`, since `List` is inherited from `Collection`).
  >
  > <footer>Thinking in Java (4th Edition), P331</footer>

27. 
  > Thus, when you create a `toString()` method, if the operations are simple ones that the compiler can figure out on its own, you can generally rely on the compiler to build the result in a reasonable fashion. But if looping is involved, you should explicitly use a `StringBuilder` in your `toString()`.
  >
  > <footer>Thinking in Java (4th Edition), P381</footer>

28. 
  > Every `String` method carefully returns a new `String` object when it's necessary to change the contents. Also notice that if the contents don't need changing, the method will just return a reference to the original `String`. This saves storage and overhead.
  >
  > <footer>Thinking in Java (4th Edition), P384</footer>

29. 
  > **`System.out.format()`**
  >
  > Java SE5 introduced the `format()` method, available to `PrintStream` or `PrintWriter` objects, which includes `System.out`. The `format()` method is modeled after C's `printf()`. There's even a convenience `printf()` method that you can use if you're feeling nostalgic, which just calls `format()`.
  >
  > ```java
  > public class SimpleFormat {
  >     public static void main(String[] args) {
  >         int x = 5;
  >         double y = 5.332542;
  >         // The old way:
  >         System.out.println("Row 1: [" + x + " " + y + "]");
  >         // The new way:
  >         System.out.format("Row 1: [%d %f]\n", x, y);
  >         // or
  >         System.out.printf("Row 1: [%d %f]\n", x, y);
  >     }
  > }
  > ```
  >
  > <footer>Thinking in Java (4th Edition), P385</footer>

30. 
  > **Format specifiers**
  >
  > To control spacing and alignment when data is inserted, you need more elaborate format specifiers. Here's the general syntax:
  >
  > ```
  > %[argument_index$][flags][width][.precision]conversion
  > ```
  >
  > Often, you'll need to control the minimum size of a field. This can be accomplished by specifying a `width`. The `Formatter` guarantees that a field is at least a certain number of characters wide by padding it with spaces if necessary. By default, the data is right justified, but this can be overridden by including a '-' in the `flags` section.
  >
  > The opposite of width is precision, which is used to specify a maximum. Unlike the `width`, which is applicable to all of the data conversion types and behaves the same with each, `precision` has a different meaning for different types. For `String`, the precision specifies the maximum number of characters from the `String` to print. For floating point numbers, precision specifies the number of decimal places to display (the default is 6), rounding if there are too many or adding trailing zeroes if there are too few. Since integers have no fractional part, `precision` isn't applicable to them and you'll get an exception if you use `precision` with an integer conversion type.
  >
  > <footer>Thinking in Java (4th Edition), P386-387</footer>

31. 
  > **`Formatter` conversions**
  >
  > ![](/media/default/thinking_in_java_4_tbl_conversion_chars.png)
  >
  > There are more obscure conversion types and other format specifier options. You can read about these in the JDK documentation for the `Formatter` class.
  >
  > <footer>Thinking in Java (4th Edition), P388</footer>

32. 
  > **`String.format()`**
  >
  > Java SE5 also took a cue from C's `sprintf()`, which is used to create Strings. `String.format()` is a `static` method which takes all the same arguments as `Formatter`'s `format()` but returns a `String`.
  >
  > <footer>Thinking in Java (4th Edition), P390</footer>

33. 
  > When an array object is created, its references are automatically initialized to `null`, so you can see whether a particular array slot has an object in it by checking to see whether it's `null`. Similarly, an array of primitives is automatically initialized to zero for numeric types, 0 for `char`, and `false` for `boolean`.
  >
  > <footer>Thinking in Java (4th Edition), P560</footer>

34. 
  > `Arrays.deepToString()` method turns multidimensional array into `String`.
  >
  > <footer>Thinking in Java (4th Edition), P562</footer>

35. 
  > **Ragged array**
  >
  > Each vector in the `array` that make up the matrix can be of **any** length:
  >
  > ```java
  > public class RaggedArray {
  >     public static void main(String[] args) {
  >         Random rand = new Random(47);
  >         // 3-D array with varied-length vectors:
  >         int[][][] a = new int[rand.nextInt(7)][][];
  >         for(int i = 0; i < a.length; i++) {
  >             a[i] = new int[rand.nextInt(5)][];
  >             for(int j = 0; j < a[i].length; j++)
  >                 a[i][j] = new int[rand.nextInt(5)];
  >         }
  >         System.out.println(Arrays.deepToString(a));
  >     }
  > }
  > /* Output:
  > [[], [[0], [0], [0, 0, 0, 0]], [[], [0, 0], [0, 0]], [[0, 0, 0], [0],
  > [0, 0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0], []], [[0], [], [0]]]
  > */
  > ```
  >
  > [Java doesn't really have multi-dimensional arrays](https://stackoverflow.com/questions/6630990/java-a-two-dimensional-array-is-stored-in-column-major-or-row-major-order)
  >
  > <footer>Thinking in Java (4th Edition), P563</footer>
