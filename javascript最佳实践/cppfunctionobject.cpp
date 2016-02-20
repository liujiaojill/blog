#include <stdio.h>
#include <stdlib.h>

struct node{
	struct node *next;
	int val;
};

class Foreach；

int main(){
	Foreach *foreach = new Foreach();
	// int i=0; C++也不能访问外部变量
	(*foreach)();
}

class Foreach
{
private:
	struct node * myList;

public:
	Foreach(){
		struct node * list = 0, *l;
		int i;
		for(i=0; i<4; i++){
			l = (struct node *)malloc(sizeof(struct node));
			l->val = i;
			l->next = list;
			list = l;
		}
		myList = list;
	}
	~Foreach(){}
	void operator()(){
		while(myList){
			printf("node(?)=%d\n",myList->val);
			myList = myList->next;
		}
	}
};
