QUnit.test("mein erster test", function(assert){
    assert.ok(1 == "1", "automatische Typenumwandlung");
});

QUnit.test("Zahlen addieren", function(assert){
    assert.ok( typeof addieren == "function", "addieren ist da" );
     assert.equal( addieren(6, 7), 13, "und addiert richtig");
     assert.equal( addieren("6", "7"), "13", "auch mit typenumwandlung");
     assert.equal( addieren("a", "b"), "ab", "nicht nummerische gehen auch");
     assert.equal( addieren("1,5", 1.2), 2.7, "auch mit komma");
     assert.equal( addieren(), 0, "ohne Parameter");
});
