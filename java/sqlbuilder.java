public class SqlBuilder {
protected StringBuilder sqlBuf = new StringBuilder();
protected List<Object> values = new ArrayList();

public SqlBuilder() {
}

public SqlBuilder appendSql(String sql) {
        this.sqlBuf.append(sql);
        return this;
}

public SqlBuilder appendValue(Object value) {
        this.sqlBuf.append('?');
        this.values.add(value);
        return this;
}

public SqlBuilder appendValues(Object[] values) {
        this.sqlBuf.append('(');
        int last = 0;

        for(int c = values.length; last < c; ++last) {
                this.sqlBuf.append('?').append(',');
                this.values.add(values[last]);
        }

        last = this.sqlBuf.length() - 1;
        if (last > 0 && this.sqlBuf.charAt(last) == ',') {
                this.sqlBuf.setCharAt(last, ')');
        }

        return this;
}

public String getSql() {
        return this.sqlBuf.toString();
}

public StringBuilder getSqlBuf() {
        return this.sqlBuf;
}

public Object[] getValues() {
        return this.values.toArray();
}
}
