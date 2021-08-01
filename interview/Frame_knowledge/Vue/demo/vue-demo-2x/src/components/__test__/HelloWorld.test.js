import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("测试HelloWorld.vue组件的测试套件，可含有多个测试用例", () => {
  it("这是测试HelloWorld组件p标签能否正常渲染文字的一个测试测试用例", () => {
    const wrapper = mount(HelloWorld, {}); // 使用mount可以创建一个包涵被挂载和渲染的一个实例
    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <p>
          a test component
        </p>
      </div>
    `);
    expect(wrapper.find("p").text()).toBe("a test component"); // expect是jest中的断言，即判断该语句前后是否相等
  });
});
