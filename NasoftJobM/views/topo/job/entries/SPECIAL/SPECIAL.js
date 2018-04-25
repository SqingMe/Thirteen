Nasoft.Window.fns.SPECIAL=function(node){
				Nasoft.Ui_extend.browser_even('#SPECIAL');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			console.log(node)
		    			$('#SPECIAL_type').combobox({//设置类型属性
	    				    editable: false,
	    					valueField: 'value',
	    					textField: 'label',
	    					value:'0',
	    					data: [{
	    						label: '不需要定时',
	    						value: '0'
	    					},{
	    						label: '时间间隔',
	    						value: '1'
	    					},{
	    						label: '天',
	    						value: '2'
	    					},{
	    						label: '周',
	    						value: '3'
	    					},{
	    						label: '月',
	    						value: '4'
	    					}],   
	    					onSelect: function(){    
	    					 
	    						SPECIAL_type_components();
	    			        } 
	    			});			
	    			$('#SPECIAL_week').combobox({//设置周属性
	    				editable: false,
    					valueField: 'value',
    					textField: 'label',
    					value:'1',
    					data: [{
    						label: '星期日',
    						value: '0'
    					},{
    						label: '星期一',
    						value: '1'
    					},{
    						label: '星期二',
    						value: '2'
    					},{
    						label: '星期三',
    						value: '3'
    					},{
    						label: '星期四',
    						value: '4'
    					},{
    						label: '星期五',
    						value: '5'
    					},{
    						label: '星期六',
    						value: '6'
    					}]});
	    			//设置数值微调组件的范围
	    			$('#second_interval').numberspinner({    
	    			    min: 0,       
	    			    editable: true   
	    			});
	    			$('#minute_interval').numberspinner({    
	    			    min: 0,        
	    			    editable: true   
	    			});
	    			$('#SPECIAL_sky_hours').numberspinner({    
	    			    min: 0,    
	    			    max: 23,    
	    			    editable: true   
	    			});
	    			$('#SPECIAL_sky_minute').numberspinner({    
	    			    min: 0,    
	    			    max: 59,    
	    			    editable: true   
	    			});
	    			$('#SPECIAL_month').numberspinner({    
	    			    min: 1,    
	    			    max: 30,    
	    			    editable: true   
	    			});
                 function SPECIAL_type_components(){//自定义方法,控制启用和禁用组件
	    				var SPECIAL_type_value=	$('#SPECIAL_type').combobox('getValue');
	    				if(SPECIAL_type_value==0){
	    					$('#second_interval').numberspinner('disable');
		    				$('#minute_interval').numberspinner('disable');
		    				$('#SPECIAL_sky_hours').numberspinner('disable');
		    				$('#SPECIAL_sky_minute').numberspinner('disable');
		    				$('#SPECIAL_month').numberspinner('disable');
		    				$('#SPECIAL_week').numberspinner('disable');
	    				}else if(SPECIAL_type_value==1){
	    					$('#second_interval').numberspinner('enable');
		    				$('#minute_interval').numberspinner('enable');
		    				$('#SPECIAL_sky_hours').numberspinner('disable');
		    				$('#SPECIAL_sky_minute').numberspinner('disable');
		    				$('#SPECIAL_month').numberspinner('disable');
		    				$('#SPECIAL_week').numberspinner('disable');		
	    				}else if(SPECIAL_type_value==2){
	    					$('#second_interval').numberspinner('disable');
		    				$('#minute_interval').numberspinner('disable');
		    				$('#SPECIAL_month').numberspinner('disable');
		    				$('#SPECIAL_week').numberspinner('disable');
		    				$('#SPECIAL_sky_hours').numberspinner('enable');
		    				$('#SPECIAL_sky_minute').numberspinner('enable');
	    				}else if(SPECIAL_type_value==3){
	    					$('#SPECIAL_sky_hours').numberspinner('enable');
		    				$('#SPECIAL_sky_minute').numberspinner('enable');
		    				$('#SPECIAL_week').numberspinner('enable');
		    				$('#second_interval').numberspinner('disable');
		    				$('#minute_interval').numberspinner('disable');
		    				$('#SPECIAL_month').numberspinner('disable');
	    				}else if(SPECIAL_type_value==4){
	    					$('#SPECIAL_sky_hours').numberspinner('enable');
		    				$('#SPECIAL_sky_minute').numberspinner('enable');
		    				$('#SPECIAL_month').numberspinner('enable');
		    				$('#second_interval').numberspinner('disable');
		    				$('#minute_interval').numberspinner('disable');
		    				$('#SPECIAL_week').numberspinner('disable');
	    				}
	    				
	    			}	
		    			if (node.getEntry().repeat && node.getEntry().repeat === "N") {//重复
				               $('#SPECIAL_repeat').get(0).checked = false;
			             } else if (node.getEntry().repeat && node.getEntry().repeat === "Y") {
				               $('#SPECIAL_repeat').get(0).checked = true;
			             } else {
				               $('#SPECIAL_repeat').get(0).checked = false;
			             }
                      if(node.getEntry().schedulerType){//类型
                    	  
                    	  $('#SPECIAL_type').combobox('setValue',node.getEntry().schedulerType);
                    	  
                      }else{
                    	  
                    	  $('#SPECIAL_type').combobox('setValue','0');
                      }
                      if(node.getEntry().intervalSeconds){//以秒计算的间隔
                    	  
                    	  $('#second_interval').numberspinner('setValue',node.getEntry().intervalSeconds);
                    	  
                      }else{
                    	  
                    	  $('#second_interval').numberspinner('setValue','0');
                      }
                      if(node.getEntry().intervalMinutes){//以分钟计算的间隔

                    	  $('#minute_interval').numberspinner('setValue',node.getEntry().intervalMinutes);
                      }else{
                    	  
                    	  $('#minute_interval').numberspinner('setValue','60');
                      }
                      if(node.getEntry().hour){//时
                    	  
                    	  $('#SPECIAL_sky_hours').numberspinner('setValue',node.getEntry().hour);
                      }else{
                    	  $('#SPECIAL_sky_hours').numberspinner('setValue','12');

                      }
                      if(node.getEntry().minutes){//分
                    	  $('#SPECIAL_sky_minute').numberspinner('setValue',node.getEntry().minutes);
                      }else{
                    	  $('#SPECIAL_sky_minute').numberspinner('setValue','0');
                      }
                      if(node.getEntry().weekDay){//周
                    	  $('#SPECIAL_week').combobox('setValue',node.getEntry().weekDay);

                      }else{
                    	  
                    	  $('#SPECIAL_week').combobox('setValue','1');
                      }
                      if(node.getEntry().DayOfMonth){//月
                    	  $('#SPECIAL_month').numberspinner('setValue',node.getEntry().DayOfMonth);

                      }else{
                    	  $('#SPECIAL_month').numberspinner('setValue','1');
                    	  
                      }
                        if(node.getEntry().schedulerType){
                        	
                        	SPECIAL_type_components();
                        	
                        }
		    			//取消
		    			$('#SPECIAL_tableInput_cancel').unbind('click').click(function(e){
		    				
		    				$('#SPECIAL').window('close');	
		    			});
		    			//确定
						$('#SPECIAL_tableInput_ok').unbind('click').click(function(e){
							 var SPECIAL={};
		                	 SPECIAL.repeat= $("#SPECIAL_repeat").prop("checked")==true ? 'Y' : 'N'; //重复
		                	 SPECIAL.schedulerType=$('#SPECIAL_type').combobox('getValue');//类型
		                	 SPECIAL.intervalSeconds=$('#second_interval').numberspinner('getValue');//以秒计算的间隔
		                	 SPECIAL.intervalMinutes=$('#minute_interval').numberspinner('getValue');//以分钟计算的间隔
		                	 SPECIAL.hour=$('#SPECIAL_sky_hours').numberspinner('getValue');//时
		                	 SPECIAL.minutes=$('#SPECIAL_sky_minute').numberspinner('getValue');//分
		                	 SPECIAL.weekDay=$('#SPECIAL_week').combobox('getValue');//周
		                	 SPECIAL.DayOfMonth=$('#SPECIAL_month').numberspinner('getValue');//月                	 
							 node.setEntry(SPECIAL);
							 console.log(node.getEntry());
							$('#SPECIAL').window('close');
						});
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
                	
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}