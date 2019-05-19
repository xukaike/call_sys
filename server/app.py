from flask import Flask, jsonify,request
import pymysql
from flask_cors import *
app = Flask(__name__)
CORS(app, supports_credentials=True)


db = pymysql.connect("localhost","root","123456","db")
cursor = db.cursor(cursor=pymysql.cursors.DictCursor)


@app.route('/get_info', methods=['GET','POST'])
def get_userid():
    page = int(request.values.get('page'))
    sql = 'SELECT * FROM 用户个人信息表'
    cursor.execute(sql)
    return jsonify(cursor.fetchall()[(page-1)*8:page*8-1])
    db.close()

@app.route('/get_order', methods=['GET','POST'])
def get_order():
    page = int(request.values.get('page'))
    sql = 'SELECT * FROM 订单表'
    cursor.execute(sql)
    return jsonify(cursor.fetchall()[(page-1)*8:page*8-1])
    db.close()

@app.route('/get_confrim/<string:id>',methods=['GET'])
def get_confrim(id):
    sql = 'SELECT * FROM 用户个人信息表 WHERE number='+id
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify({"userpasswd":data})
    db.close()

@app.route('/login',methods=['POST'])
def login():

    id = request.values.get('id')
    password = request.values.get('password')
    sql = 'SELECT password FROM 用户个人信息表 WHERE number='+id
    cursor.execute(sql)
    if password == cursor.fetchall()[0]['password']:
        sql = 'SELECT * FROM 用户个人信息表 WHERE number='+id
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    else:
        return 'error'

@app.route('/loginadmin',methods=['POST'])
def loginadmin():

    id = request.values.get('id')
    password = request.values.get('password')
    sql = 'SELECT password FROM 管理员个人信息表 WHERE number='+id
    cursor.execute(sql)
    if password == cursor.fetchall()[0]['password']:
        sql = 'SELECT * FROM 管理员个人信息表 WHERE number='+id
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    else:
        return 'error'

@app.route('/loginopt',methods=['POST'])
def loginopt():

    id = request.values.get('id')
    password = request.values.get('password')
    sql = 'SELECT password FROM 话务员个人信息表 WHERE number='+id
    cursor.execute(sql)
    if password == cursor.fetchall()[0]['password']:
        sql = 'SELECT * FROM 话务员个人信息表 WHERE number='+id
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    else:
        return 'error'

@app.route('/admindata',methods=['GET'])
def getdata():
    user = 'SELECT * FROM 用户个人信息表 '
    order = 'SELECT * FROM 订单表 '
    cursor.execute(user)
    userdata = cursor.fetchall()
    cursor.execute(order)
    orderdata = cursor.fetchall()
    return jsonify({'用户': userdata, '订单': orderdata})
    db.close()
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)