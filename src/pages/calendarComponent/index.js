var util = require('../../utils/util.js');
const conf = {
  data: {
    calendarConfig: {
      showLunar: true
    },
    date:new Date(),
    begintime: util.formatTime(new Date()).split(',')[0],
    isSearchTermHidden:true,
    actionBtn: [
      // {
      //   text: '跳转指定日期',
      //   action: 'jump',
      //   color: 'olive'
      // },
      {
        text: '获取当前已选',
        action: 'getSelectedDay',
        color: 'red'
      },
      // {
      //   text: '获取所有代办',
      //   action: 'getTodoLabels',
      //   color: 'purple'
      // },
      
      // {
      //   text: '设置待办事项',
      //   action: 'setTodoLabels',
      //   color: 'cyan'
      // },
      // {
      //   text: '删除指定代办',
      //   action: 'deleteTodoLabels',
      //   color: 'pink'
      // },
      // {
      //   text: '清空待办事项',
      //   action: 'clearTodoLabels',
      //   color: 'red'
      // },
     
      // {
      //   text: '禁选指定日期',
      //   action: 'disableDay',
      //   color: 'olive'
      // },
      // {
      //   text: '指定可选区域',
      //   action: 'enableArea',
      //   color: 'pink'
      // },
      // {
      //   text: '指定特定可选',
      //   action: 'enableDays',
      //   color: 'red'
      // },
      // {
      //   text: '选中指定日期',
      //   action: 'setSelectedDays',
      //   color: 'cyan'
      // },
      {
        text: '周月视图切换',
        action: 'switchView',
        color: 'orange'
      },
      // {
      //   text: '取消所有选中',
      //   action: 'cancelAllSelectedDay',
      //   color: 'mauve'
      // },
      // {
      //   text: '自定义配置',
      //   action: 'config',
      //   color: 'grey',
      //   disable: true
      // },
      // {
      //   text: '获取日历面板日期',
      //   action: 'getCalendarDates',
      //   color: 'purple'
      // }
    ]
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res,
         
        })
      }
    })
    
  },
  afterTapDay(e) {
    var that=this;
    console.log('afterTapDay', e.detail);
    var time = e.detail.lunar.cYear + '-' + e.detail.lunar.cMonth + '-'+e.detail.lunar.cDay
    that.setData({
      begintime:time
    })
  },
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
  },
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
  },
  onTapDay(e) {
    console.log('onTapDay', e.detail);
  },
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e);
  },
  onSwipe(e) {
    console.log('onSwipe', e);
  },
  showToast(msg) {
    if (!msg || typeof msg !== 'string') return;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    });
  },
  generateRandomDate(type) {
    let random = ~~(Math.random() * 10);
    switch (type) {
      case 'year':
        random = 201 * 10 + ~~(Math.random() * 10);
        break;
      case 'month':
        random = (~~(Math.random() * 10) % 9) + 1;
        break;
      case 'date':
        random = (~~(Math.random() * 100) % 27) + 1;
        break;
      default:
        break;
    }
    return random;
  },
  handleAction(e) {
    const { action, disable } = e.currentTarget.dataset;
    if (disable) {
      this.showToast('抱歉，还不支持～😂');
    }
    this.setData({
      rst: []
    });
    const calendar = this.calendar;
    const { year, month } = calendar.getCurrentYM();
    switch (action) {
      case 'config':
        break;
      case 'jump': {
        const year = this.generateRandomDate('year');
        const month = this.generateRandomDate('month');
        const date = this.generateRandomDate('date');
        
        calendar[action](year, month, date);
        break;
      }
      case 'getSelectedDay': {
        const selected = calendar[action]();
        if (!selected || !selected.length)
          return this.showToast('当前未选择任何日期');
        console.log('get selected days: ', selected);
        const rst = selected.map(item => JSON.stringify(item));
        var list = JSON.parse(rst)
        
        console.log(list.lunar)
        this.setData({
          rst: list.lunar.cYear + '年' + list.lunar.cMonth + '月' + list.lunar.cDay + '号' + list.lunar.ncWeek + ',农历:' + list.lunar.IMonthCn + list.lunar.IDayCn+',' + list.lunar.gzYear + '年' + '(' + list.lunar.Animal + ')' + list.lunar.gzMonth + '月' + list.lunar.gzDay + '天,' + list.lunar.astro
        });
        break;
      }
      case 'cancelAllSelectedDay':
        calendar[action]();
        break;
      case 'setTodoLabels': {
        const days = [
          {
            year,
            month,
            day: this.generateRandomDate('date'),
            todoText: Math.random() * 10 > 5 ? '领奖日' : ''
          }
        ];
        calendar[action]({
          showLabelAlways: true,
          days
        });
        console.log('set todo labels: ', days);
        break;
      }
      case 'deleteTodoLabels': {
        const todos = [...calendar.getTodoLabels()];
        if (todos && todos.length) {
          todos.length = 1;
          calendar[action](todos);
          const _todos = [...calendar.getTodoLabels()];
          setTimeout(() => {
            const rst = _todos.map(item => JSON.stringify(item));
            var that = this;
            var str = ""
            for (var i = 0; i < rst.length; i++) {
              var list = JSON.parse(rst[i]);
              if (list.todoText) {
                str += list.year + '-' + list.month + '-' + list.day + " " + list.todoText + ' '

              } else {
                str += list.year + '-' + list.month + '-' + list.day + ' '

              }
            }
           
            this.setData(
              {
                rst:str
              },
              () => {
                console.log('set todo labels: ', todos);
              }
            );
          });
        } else {
          this.showToast('没有待办事项');
        }
        break;
      }
      case 'clearTodoLabels':
        const todos = [...calendar.getTodoLabels()];
        if (!todos || !todos.length) {
          return this.showToast('没有待办事项');
        }
        calendar[action]();
        break;
      case 'getTodoLabels': {
        const selected = calendar[action]();
        if (!selected || !selected.length)
          return this.showToast('未设置待办事项');
        const rst = selected.map(item => JSON.stringify(item));
        rst.map(item => JSON.stringify(item));
        console.log(rst.length)
        var that=this;
          var str=""
        for(var i=0;i<rst.length;i++){
         var list= JSON.parse(rst[i]);
          if (list.todoText) {
            str += list.year + '-' + list.month + '-' + list.day + " " + list.todoText+' '
            
          } else {
            str += list.year + '-' + list.month + '-' + list.day + ' '
            
          }
        }
        this.setData({
          rst: str
        });
        break;
      }
      case 'disableDay':
        calendar[action]([
          {
            year,
            month,
            day: this.generateRandomDate('date')
          }
        ]);
        break;
      case 'enableArea': {
        let sDate = this.generateRandomDate('date');
        let eDate = this.generateRandomDate('date');
        if (sDate > eDate) {
          [eDate, sDate] = [sDate, eDate];
        }
        const area = [`${year}-${month}-${sDate}`, `${year}-${month}-${eDate}`];
        calendar[action](area);
        this.setData({
          rstStr: JSON.stringify(area)
        });
        break;
      }
      case 'enableDays':
        const days = [
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`
        ];
        calendar[action](days);
        this.setData({
          rstStr: JSON.stringify(days)
        });
        break;
      case 'switchView':
        const selected =calendar.getSelectedDay();
        if (!selected || !selected.length)
          return this.showToast('当前未选择任何日期');
        
        if (!this.week) {
          
          calendar[action]('week');
          this.week = true;
        } else {
          calendar[action]();
          
          this.week = false;
        }
        
        break;
      case 'setSelectedDays':
        const toSet = [
          {
            year,
            month,
            day: this.generateRandomDate('date')
          },
          {
            year,
            month,
            day: this.generateRandomDate('date')
          }
        ];
        calendar[action](toSet);
        break;
      case 'getCalendarDates':
        this.showToast('请在控制台查看结果');
        console.log(calendar.getCalendarDates());
        break;
      default:
        break;
    }
  },
//跳转制定日期
  getjumptimeAction:function(e){
    const calendar = this.calendar;
    console.log(e.detail.value.split('-'))
    const year = e.detail.value.split('-')[0];
    const month = e.detail.value.split('-')[1];
    const date = e.detail.value.split('-')[2];
    calendar.jump(year,month,date)
    
  },
//设置代办事项
  setItemAction:function(e){
    
   this.setData({
     isSearchTermHidden:false
   })


  },
  getStartTimeAction:function(e){
   this.setData({
     begintime:e.detail.value
   })
  },
  gettextAction:function(e){
    console.log(e.detail.value)
   this.setData({
     text:e.detail.value
   })
  },
  cancelAction:function(e){
  this.setData({
  isSearchTermHidden: true
  })
  },
  sureAction:function(){
    var that=this;
    this.setData({
      isSearchTermHidden: true
    })
   const calendar = this.calendar;
  const year = that.data.begintime.split('-')[0];
    const month = that.data.begintime.split('-')[1];
    const date = that.data.begintime.split('-')[2];
    calendar.jump(year, month, date)
    const days = [
      {
        year,
        month,
        day: date,
        todoText: that.data.text
      }
    ];
    calendar.setTodoLabels({
      showLabelAlways: true,
      days
    });







  },

   onShareAppMessage() {
    return {
      title: '一千家日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/calendarComponent/index'
    };
  }
};

Page(conf);
